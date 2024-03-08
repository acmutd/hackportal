import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../../lib/admin/init';
import { userIsAuthorized } from '../../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

// interface of subscription data that contains the user id and the post id
interface SubscriptionData {
  userId: string;
  postId: string;
}

// create a subscription for user that subscribe them to a post
async function createSubscription(req: NextApiRequest, res: NextApiResponse) {
  try {
    const subscriptionData: SubscriptionData = JSON.parse(req.body);
    await db.collection('subscriptions').add(subscriptionData);
    return res.status(201).json({
      msg: 'Subscription created',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Unexpected error. Please try again later',
    });
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['hacker']);

  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'Request is not authorized to perform this functionality',
    });
  }

  return createSubscription(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
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
