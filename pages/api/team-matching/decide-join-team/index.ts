import { auth, firestore } from 'firebase-admin';
import initializeApi from '../../../../lib/admin/init';
import { NextApiRequest, NextApiResponse } from 'next';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import {
  TEAM_MATCHING_INTERESTS_COLLECTION,
  TEAM_MATCHING_POSTINGS_COLLECTION,
  TEAM_MATCHING_PROFILES_COLLECTION,
  TeamMatchingInterest,
  TeamMatchingInterestStatus,
  TeamMatchingPosting,
  TeamMatchingProfile,
} from '../_types';
import aws_ses from '../_aws-ses-wrapper';

initializeApi();
const db = firestore();

async function putJoinTeamDecision(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;
  const userToken = headers['authorization'];

  // Get user payload to get team matching profile and interest
  let userPayload: DecodedIdToken;
  try {
    userPayload = await auth().verifyIdToken(userToken);
  } catch (err) {
    return res.status(403).json({
      msg: 'Request is not authorized to decide on joining team.',
    });
  }

  // Parse request body
  let reqBody: {
    postingId: string;
    decision: TeamMatchingInterestStatus.accepted | TeamMatchingInterestStatus.rejected;
  };
  try {
    reqBody = JSON.parse(req.body);
  } catch (error) {
    console.error('Could not parse request JSON body');
    return res.status(400).json({
      type: 'invalid',
      message: '',
    });
  }

  const { postingId, decision } = reqBody;

  // Main
  try {
    // 1. Fetch team matching profile of requester
    const userProfileQuery = await db
      .collection(TEAM_MATCHING_PROFILES_COLLECTION)
      .where('userId', '==', userPayload.uid)
      .get();

    if (userProfileQuery.empty) {
      return res.status(403).json({
        msg: 'Team matching profile not found.',
      });
    }

    const userProfileDoc = userProfileQuery.docs[0];

    // 2. Fetch interest
    const interestQuery = await db
      .collection(TEAM_MATCHING_INTERESTS_COLLECTION)
      .where('postingId', '==', postingId)
      .where('teamMatchingProfileId', '==', userProfileDoc.id)
      .get();

    const interestDoc = interestQuery.docs[0];
    const interest = interestDoc.data() as unknown as TeamMatchingInterest;

    if (interest.status !== TeamMatchingInterestStatus.waiting_confirmation) {
      return res.status(403).json({
        msg: 'Interest is not waiting for confirmation.',
      });
    }

    // 3. Batch update team matching interest + team matching profile alreadyInTeam status
    const batch = db.batch();
    batch.update(interestDoc.ref, { status: decision });

    if (decision === TeamMatchingInterestStatus.accepted) {
      batch.update(userProfileDoc.ref, { alreadyInTeam: true });
    }

    await batch.commit();

    // 4. Fetch post
    const postingQuery = await db
      .collection(TEAM_MATCHING_POSTINGS_COLLECTION)
      .where(firestore.FieldPath.documentId(), '==', postingId)
      .get();

    const posting: TeamMatchingPosting =
      postingQuery.docs[0].data() as unknown as TeamMatchingPosting;

    // 5. Fetch poster profile
    const posterProfileQuery = await db
      .collection(TEAM_MATCHING_PROFILES_COLLECTION)
      .where('userId', '==', posting.ownerUserId)
      .get();

    const posterProfile = posterProfileQuery.docs[0].data() as unknown as TeamMatchingProfile;

    // 6. Notify poster of this decision
    const sendEmailCommand = aws_ses.createSendEmailCommand(posterProfile.email, 'FROM_EMAIL');

    await aws_ses.sesClient.send(sendEmailCommand);
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      msg: 'Server Error',
    });
  }
}

function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  return putJoinTeamDecision(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'PUT': {
      return handlePutRequest(req, res);
    }
    default: {
      return res.status(404).json({
        msg: 'Route not found',
      });
    }
  }
}
