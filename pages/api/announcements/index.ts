import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';

initializeApi();
const db = firestore();

const ANNOUNCEMENTS_COLLECTION = '/announcements';

/**
 *
 * API endpoint to post announcement to backend
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function postAnnouncementToDB(req: NextApiRequest, res: NextApiResponse) {
  const doc = await db.collection(ANNOUNCEMENTS_COLLECTION).add(JSON.parse(req.body));
  res.json(doc);
}

/**
 *
 * API endpoint to get all announcement from backend
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getAllAnnouncements(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db.collection(ANNOUNCEMENTS_COLLECTION).orderBy('time', 'desc').get();
  let data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.json(data);
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  return postAnnouncementToDB(req, res);
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getAllAnnouncements(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      return handleGetRequest(req, res);
    }
    case 'POST': {
      return handlePostRequest(req, res);
    }
  }
}
