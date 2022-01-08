import { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from 'firebase-admin';
import initializeApi from '../../../lib/admin/init';

initializeApi();
const db = firestore();

const QUESTIONS_COLLECTION = '/questions';

export interface QAReqBody {
  userId: string;
  question: string;
}

export interface QADocument extends QAReqBody {
  status: 'pending' | 'answered';
  answer: string;
  id: string;
}

/**
 *
 * Post a question asked by user to the backend
 *
 * @param req request object
 * @param res response object
 *
 *
 */
async function postQuestionToDB(req: NextApiRequest, res: NextApiResponse) {
  const questionDoc: Partial<QADocument> = {
    userId: req.body.userId,
    question: req.body.question,
    answer: '',
    status: 'pending',
  };

  await db.collection(QUESTIONS_COLLECTION).add(questionDoc);

  res.status(200).json({
    status: 'completed',
  });
}

async function getAllQuestions(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db.collection(QUESTIONS_COLLECTION).get();
  let questions = [];
  snapshot.forEach((doc) => {
    questions.push(doc.data());
  });
  res.json(questions);
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  return postQuestionToDB(req, res);
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getAllQuestions(req, res);
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
    default: {
      return res.status(404).json({
        msg: 'Route not found',
      });
    }
  }
}
