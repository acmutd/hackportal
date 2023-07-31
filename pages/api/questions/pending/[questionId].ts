import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../../lib/admin/init';
import { userIsAuthorized } from '../../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

const QUESTION_COLLECTION = '/questions';

/**
 *
 * API endpoint to fetch a pending question with given ID
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getPendingQuestionById(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db
    .collection(QUESTION_COLLECTION)
    .doc(req.query.questionId as string)
    .get();
  res.json(snapshot.data());
}

/**
 *
 * API endpoint to post an answer to a pending question
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function resolvePendingQuestionById(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;
  const userToken = headers['authorization'];

  const isAuthorized = await userIsAuthorized(userToken, ['super_admin', 'admin']);
  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not authorized to perform admin functionality.',
    });
  }

  const newData = {
    ...JSON.parse(req.body),
    status: 'answered',
  };
  const doc = await db
    .collection(QUESTION_COLLECTION)
    .doc(req.query.questionId as string)
    .set(newData, {
      merge: true,
    });
  res.json(doc);
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getPendingQuestionById(req, res);
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  return resolvePendingQuestionById(req, res);
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
