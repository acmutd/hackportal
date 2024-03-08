import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../../lib/admin/init';
import { userIsAuthorized } from '../../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

// get all subscriptions for user
async function getSubscriptions(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.userId as string;
    const snapshot = await db.collection('subscriptions').where('userId', '==', userId).get();
    if (snapshot.empty) {
      return res.status(404).json({
        msg: 'Subscriptions not found',
      });
    }
    const subscriptions = [];
    snapshot.forEach((doc) => {
      subscriptions.push(doc.data());
    });
    return res.status(200).json(subscriptions);
  } catch (error) {
    return res.status(500).json({
      msg: 'Unexpected error. Please try again later',
    });
  }
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['hacker']);

  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'Request is not authorized to perform this functionality',
    });
  }

  return getSubscriptions(req, res);
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
