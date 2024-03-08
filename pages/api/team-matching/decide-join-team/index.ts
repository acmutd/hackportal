import { auth, firestore } from 'firebase-admin';
import initializeApi from '../../../../lib/admin/init';
import { NextApiRequest, NextApiResponse } from 'next';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import {
  TEAM_MATCHING_INTERESTS_COLLECTION,
  TEAM_MATCHING_PROFILES_COLLECTION,
  TeamMatchingInterest,
  TeamMatchingInterestStatus,
  TeamMatchingPosting,
  TeamMatchingProfile,
} from '../_types';

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
    // Fetch team matching profile of requester
    const profileQuery = await db
      .collection(TEAM_MATCHING_PROFILES_COLLECTION)
      .where('userId', '==', userPayload.uid)
      .get();

    if (profileQuery.empty) {
      return res.status(403).json({
        msg: 'Team matching profile not found.',
      });
    }

    const profileDoc = profileQuery.docs[0];

    // Fetch interest
    const interestQuery = await db
      .collection(TEAM_MATCHING_INTERESTS_COLLECTION)
      .where('postingId', '==', postingId)
      .where('teamMatchingProfileId', '==', profileDoc.id)
      .get();

    const interestDoc = interestQuery.docs[0];
    const interest = interestDoc.data() as unknown as TeamMatchingInterest;

    if (interest.status !== TeamMatchingInterestStatus.waiting_confirmation) {
      return res.status(403).json({
        msg: 'Interest is not waiting for confirmation.',
      });
    }

    // Batch update team matching interest + team matching profile alreadyInTeam status
    const batch = db.batch();
    batch.update(interestDoc.ref, { status: decision });

    if (decision === TeamMatchingInterestStatus.accepted) {
      batch.update(profileDoc.ref, { alreadyInTeam: true });
    }

    await batch.commit();

    // TODO: Notify poster of this decision
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
