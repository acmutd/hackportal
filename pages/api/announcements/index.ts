import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';

initializeApi();
const db = firestore();

const ANNOUNCEMENTS_COLLECTION = '/announcements';

async function postAnnouncementToDB(req: NextApiRequest, res: NextApiResponse) {
  const doc = await db.collection(ANNOUNCEMENTS_COLLECTION).add({
    announcement: JSON.parse(req.body).announcement,
  });
  res.json(doc);
}

async function getAllAnnouncements(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db.collection(ANNOUNCEMENTS_COLLECTION).get();
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
