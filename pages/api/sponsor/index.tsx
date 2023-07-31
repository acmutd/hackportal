import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';

initializeApi();
const db = firestore();

const SPONSORS = '/sponsors';

/**
 *
 * API endpoint to get data of keynote speakers from backend for the keynote speakers section in home page
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getSponsors(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db.collection(SPONSORS).get();
  let data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.json(data);
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getSponsors(req, res);
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
