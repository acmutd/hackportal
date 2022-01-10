import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../../lib/admin/init';

initializeApi();
const db = firestore();

const QUESTIONS_COLLECTION = '/questions';

/**
 *
 * API endpoint to fetch all pending questions
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getPendingQuestions(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db.collection(QUESTIONS_COLLECTION).where('status', '==', 'pending').get();
  let questions = [];
  snapshot.forEach((doc) => {
    questions.push({
      ...doc.data(),
      id: doc.id,
    });
  });
  res.json(questions);
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getPendingQuestions(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      return handleGetRequest(req, res);
    }
  }
}
