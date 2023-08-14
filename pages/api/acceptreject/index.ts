import { firestore, messaging } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

/**
 *
 * Represent how data of a hacker status is stored in the backend
 *
 */
export interface HackerStatus {
  adminId: string;
  hackerId: string;
  status: string;
}

/**
 *
 * API endpoint to post a list of hackers' statuses (accepted/rejected) by given admin id
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function postHackerStatus(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;

  const userToken = headers['authorization'];
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);

  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not authorized to perform admin functionality.',
    });
  }
  const { adminId, hackerIds, status } = JSON.parse(req.body);

  const jobs = [];
  for (const hackerId of hackerIds) {
    const docRef = db.collection('acceptreject').doc(`${adminId}-${hackerId}`);

    jobs.push([
      hackerId,
      docRef.set(
        {
          adminId,
          hackerId,
          status,
        },
        { merge: true },
      ),
    ]);
  }

  const failed = [];
  for (const [hackerId, job] of jobs) {
    try {
      await job;
      console.log(`Hacker ${hackerId} updated successfully`);
    } catch (error) {
      console.error(`Error updating hacker ${hackerId} status: `, error);
      failed.push(hackerId);
    }
  }

  if (failed.length === 0) {
    res.status(200).json({ message: 'Hacker updated successfully' });
  } else {
    res.status(500).json({ message: 'Error updating hacker status' });
  }
}

/**
 *
 * API endpoint to get all hackers (id and status) accepted/rejected by given admin id
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getAllHackers(req: NextApiRequest, res: NextApiResponse) {
  const {
    headers,
    query: { adminId },
  } = req;

  const userToken = headers['authorization'];
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);

  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not authorized to perform admin functionality.',
    });
  }

  const snapshot = await db.collection('acceptreject').where('adminId', '==', adminId).get();

  let hackers = [];
  snapshot.forEach((doc) => {
    hackers.push(doc.data());
  });

  res.json(hackers);
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  return postHackerStatus(req, res);
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getAllHackers(req, res);
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
