import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../../lib/admin/init';

initializeApi();
const db = firestore();

const QUESTIONS_COLLECTION = '/questions';

/**
 *
 * Fetch all answered question asked by a certain from the database
 *
 * @param req request object
 * @param res response object
 *
 *
 */
async function getAnsweredQuestionByUserId(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  const snapshot = await db
    .collection(QUESTIONS_COLLECTION)
    .where('userId', '==', userId)
    .where('status', '==', 'answered')
    .get();
  let data = [];

  snapshot.forEach((doc) => {
    data.push(doc.data());
  });

  res.json(data);
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getAnsweredQuestionByUserId(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  if (method === 'GET') {
    return handleGetRequest(req, res);
  } else {
    return res.status(404).json({
      msg: 'Route not found',
    });
  }
}
