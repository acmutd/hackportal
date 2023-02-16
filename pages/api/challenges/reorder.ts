import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

const CHALLENGES = '/challenges';

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const reorderedChallenges: Challenge[] = req.body;
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);
  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'Request is not authorized to perform admin functionality',
    });
  }
  const challenges = await db.collection(CHALLENGES).get();
  challenges.forEach(async (doc) => {
    const newRank = reorderedChallenges.findIndex((obj) => obj.rank === doc.data().rank);
    await doc.ref.update({
      ...doc.data(),
      rank: newRank,
    });
  });
  return res.json({
    msg: 'ok',
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'POST': {
      return handlePostRequest(req, res);
    }
  }
}
