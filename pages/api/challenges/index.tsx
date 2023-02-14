import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

const CHALLENGES = '/challenges';

/**
 *
 * API endpoint to get data of keynote speakers from backend for the keynote speakers section in home page
 *
 * @param req HTTP request object
 * @param res HTTP response object
 *
 *
 */
async function getChallenges(req: NextApiRequest, res: NextApiResponse) {
  const snapshot = await db.collection(CHALLENGES).get();
  let data = [];
  snapshot.forEach((doc) => {
    data.push(doc.data());
  });
  res.json(data);
}

async function updateChallengeDatabase(req: NextApiRequest, res: NextApiResponse) {
  const challengeData = JSON.parse(req.body);
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);
  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'Request is not authorized to perform admin functionality',
    });
  }
  const challenge = await db.collection(CHALLENGES).where('rank', '==', challengeData.rank).get();
  if (challenge.empty) {
    await db.collection(CHALLENGES).add(challengeData);
    return res.status(201).json({
      msg: 'Challenge created',
    });
  }

  challenge.forEach(async (doc) => {
    await db.collection(CHALLENGES).doc(doc.id).update(challengeData);
  });

  return res.status(200).json({
    msg: 'Challenge updated',
  });
}

async function deleteChallenge(req: NextApiRequest, res: NextApiResponse) {
  const challengeData = JSON.parse(req.body);
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);
  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'Request is not authorized to perform admin functionality',
    });
  }
  const challengeDoc = await db
    .collection(CHALLENGES)
    .where('rank', '==', challengeData.rank)
    .get();
  challengeDoc.forEach(async (doc) => {
    await db.collection(CHALLENGES).doc(doc.id).delete();
  });
  return res.json({
    msg: 'Challenge deleted',
  });
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  return getChallenges(req, res);
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  return updateChallengeDatabase(req, res);
}

function handleDeleteRequest(req: NextApiRequest, res: NextApiResponse) {
  return deleteChallenge(req, res);
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
    case 'DELETE': {
      return handleDeleteRequest(req, res);
    }
    default: {
      return res.status(404).json({
        msg: 'Route not found',
      });
    }
  }
}
