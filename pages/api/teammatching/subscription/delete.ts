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

// delete one subscription for user that unsubscribe them to a post
async function deleteSubscription(req: NextApiRequest, res: NextApiResponse) {
  try {
    const subscriptionData: SubscriptionData = JSON.parse(req.body);
    const snapshot = await db
      .collection('subscriptions')
      .where('userId', '==', subscriptionData.userId)
      .where('postId', '==', subscriptionData.postId)
      .get();
    if (snapshot.empty) {
      return res.status(404).json({
        msg: 'Subscription to posting not found',
      });
    }
    snapshot.forEach((doc) => {
      doc.ref.delete();
    });
    return res.status(200).json({
      msg: 'Subscription to posting deleted',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Unexpected error. Please try again later',
    });
  }
}

async function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['hacker']);

  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'Request is not authorized to perform this functionality',
    });
  }

  return deleteSubscription(req, res);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'POST': {
      return handleDeleteRequest(req, res);
    }
    default: {
      return res.status(404).json({
        msg: 'Route not found',
      });
    }
  }
}
