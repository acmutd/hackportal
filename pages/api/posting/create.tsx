import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();
const POSTINGS_COLLECTION = '/postings';

// yes or no?
interface PostingData {
  team: String;
  interestedPpl: String;
  amountOfPplWanted: Number;
  skillSet: String;
}

async function createPosting(req: NextApiRequest, res: NextApiResponse) {
  try {
    //  process each field
    // if undefined,
    const postingData = JSON.parse(req.body);
    postingData.name = postingData.name.trim();

    await db.collection(POSTINGS_COLLECTION).add(postingData);
    return res.status(201).json({
      msg: 'Posting created',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Unexpected error. Please try again later',
    });
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);

  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'Request is not authorized to perform admin functionality',
    });
  }

  return createPosting(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'POST': {
      return handlePostRequest(req, res);
    }
    default: {
      return res.status(404).json({
        msg: 'Route not found',
      });
    }
  }
}
