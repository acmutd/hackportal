import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';

initializeApi();
const db = firestore();

const Spotlight_Events = '/spotlightevents';

/**
 *
 * API endpoint to get data of events from backend for the spotlight events section
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getSpotlightEvents(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db.collection(Spotlight_Events).get();
  let data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.json(data);
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getSpotlightEvents(req, res);
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
