import { auth, firestore } from 'firebase-admin';
import initializeApi from '../../../../lib/admin/init';
import { NextApiRequest, NextApiResponse } from 'next';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import {
  TEAM_MATCHING_INTERESTS_COLLECTION,
  TEAM_MATCHING_POSTINGS_COLLECTION,
  TeamMatchingInterestStatus,
  TeamMatchingPosting,
} from '../_types';

initializeApi();
const db = firestore();

async function putAcceptInterest(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;
  const userToken = headers['authorization'];

  // Get user payload to check against posting owner id
  let userPayload: DecodedIdToken;
  try {
    userPayload = await auth().verifyIdToken(userToken);
  } catch (err) {
    return res.status(403).json({
      msg: 'Request is not authorized to update posting interests.',
    });
  }

  // Parse request body
  let reqBody: { postingId: string; teamMatchingProfileIds: string[] };
  try {
    reqBody = JSON.parse(req.body);
  } catch (error) {
    console.error('Could not parse request JSON body');
    return res.status(400).json({
      type: 'invalid',
      message: '',
    });
  }

  const { postingId, teamMatchingProfileIds } = reqBody;

  // Main
  try {
    // Fetch target posting
    const postingQuery = await db
      .collection(TEAM_MATCHING_POSTINGS_COLLECTION)
      .where(firestore.FieldPath.documentId(), '==', postingId)
      .get();

    if (postingQuery.empty) {
      return res.json({
        msg: 'Posting does not exist',
      });
    }

    const posting: TeamMatchingPosting =
      postingQuery.docs[0].data() as unknown as TeamMatchingPosting;

    if (posting.ownerUserId !== userPayload.uid) {
      return res.status(403).json({
        msg: 'Must be the posting owner to update interests.',
      });
    }

    // Fetch target interests
    const interestsQuery = await db
      .collection(TEAM_MATCHING_INTERESTS_COLLECTION)
      .where('postingId', '==', postingId)
      .where('teamMatchingProfileId', 'in', teamMatchingProfileIds)
      .get();

    // Batch update team matching interest documents
    const batch = db.batch();
    interestsQuery.docs.map((interestDoc) => {
      batch.update(interestDoc.ref, { status: TeamMatchingInterestStatus.waiting_confirmation });
    });
    await batch.commit();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      msg: 'Server Error',
    });
  }
}

function handlePutRequest(req: NextApiRequest, res: NextApiResponse) {
  return putAcceptInterest(req, res);
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
