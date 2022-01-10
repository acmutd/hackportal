import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';

initializeApi();
const db = firestore();

const ANNOUNCEMENTS_COLLECTION = '/announcements';
const TOKENS_COLLECTION = '/tokens';
const MAX_PER_BATCH = 1000;

async function sendNotifications(announcement: unknown) {
  const tokens_snapshot = await db.collection(TOKENS_COLLECTION).get();
  let tokens = [];

  tokens_snapshot.forEach((doc) => {
    tokens.push(doc.data().token);
  });

  for (let i = 0; i < tokens.length; i += MAX_PER_BATCH) {
    let currentBatch = [];
    for (let j = i; j < Math.min(i + MAX_PER_BATCH, tokens.length); j++) {
      currentBatch.push(tokens[j]);
    }
    await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'post',
      headers: {
        Authorization: `key=${process.env.NEXT_PUBLIC_CLOUD_MESSAGING_SERVER_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        registration_ids: currentBatch,
        data: {
          notification: announcement,
        },
      }),
    });
  }
}

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
  const reqBody = {
    ...JSON.parse(req.body),
    timestamp: new Date().toUTCString(),
  };
  const doc = await db.collection(ANNOUNCEMENTS_COLLECTION).add(reqBody);
  sendNotifications(reqBody);
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
  const snapshot = await db.collection(ANNOUNCEMENTS_COLLECTION).orderBy('timestamp', 'desc').get();
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
