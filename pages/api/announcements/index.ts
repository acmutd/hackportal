import { firestore, messaging } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();
const mesg = messaging();

const ANNOUNCEMENTS_COLLECTION = '/announcements';
const TOKENS_COLLECTION = '/tokens';
const MAX_PER_BATCH = 500;

/**
 *
 * Send notifications to users using the firebase admin messaging SDK
 *
 * @param announcement Announcement to send
 *
 *
 */
async function sendNotifications(announcement: any) {
  // Retrieve tokens from firestore
  const tokenListSnapshot = await db.collection(TOKENS_COLLECTION).get();
  const tokenList = tokenListSnapshot.docs.map((doc) => doc.data().token);

  // Chunk the tokenList by max # of tokens per batch
  for (let i = 0; i < tokenList.length; i += MAX_PER_BATCH) {
    const currentBatch = tokenList.slice(i, i + MAX_PER_BATCH);

    // Create the message body
    const message = {
      data: {
        ...announcement,
        baseUrl: process.env.BASE_URL,
        iconUrl: 'icons/icon-128x128.png', // !!!CHANGE
      },
      tokens: currentBatch,
    };

    // Call the messaging API to send the notification
    mesg.sendMulticast(message).catch((err) => {
      console.error(err);
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
  const { headers } = req;

  const userToken = headers['authorization'];
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);

  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not authorized to perform admin functionality.',
    });
  }

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
  data.sort((a, b) => {
    const timeA = new Date(a.timestamp),
      timeB = new Date(b.timestamp);
    return timeB.getTime() - timeA.getTime();
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
