import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';

initializeApi();
const db = firestore();

const MEMBERS_COLLECTION = '/members';

/**
 *
 * API endpoint to get data of members from backend for the "Meet the team" section
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getMembersData(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db.collection(MEMBERS_COLLECTION).get();
  let data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.json(data);
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getMembersData(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      return handleGetRequest(req, res);
    }
    default: {
      return res.status(404).json({
        msg: 'Route not found',
      });
    }
  }
}
