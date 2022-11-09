import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

const MISCELLANEOUS = '/miscellaneous';

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  try {
    let snapshot = await db.collection(MISCELLANEOUS).doc('preferences').get();
    if (!snapshot.exists) {
      await db
        .collection(MISCELLANEOUS)
        .doc('preferences')
        .create({ tracks: false, challenges: false });
      snapshot = await db.collection(MISCELLANEOUS).doc('preferences').get();
    }
    let toggles = snapshot.data();
    return res.status(200).json({
      code: 'fetch-preferences',
      message: `Fetched preferences.`,
      data: { ...toggles },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 'internal-error',
      message: 'Something went wrong when processing this request. Tell Nick and he will fix it.',
    });
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { token, type },
    headers,
  } = req;
  const userToken = (token as string) || (headers['authorization'] as string);
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);
  if (!isAuthorized) {
    return res.status(401).send({
      type: 'request-unauthorized',
      message: 'Request is not authorized to perform admin functionality.',
    });
  }
  const key = type as string;
  try {
    const snapshot = await db.collection(MISCELLANEOUS).doc('preferences').get();
    if (!snapshot.exists) {
      await db
        .collection(MISCELLANEOUS)
        .doc('preferences')
        .create({ tracks: true, challenges: false });
      return res.status(201).json({
        code: 'created-preferences',
        message: 'Created default preferences.',
        data: { tracks: false, challenges: false },
      });
    }
    let toggles = snapshot.data();
    if (key === 'tracks') {
      toggles.tracks = !toggles.tracks;
    } else if (key === 'challenges') {
      toggles.challenges = !toggles.challenges;
    }
    await db
      .collection(MISCELLANEOUS)
      .doc('preferences')
      .update({ ...toggles });
    return res.status(200).json({
      code: 'set-preferences',
      message: `Preferences updated.`,
      data: { ...toggles },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      code: 'internal-error',
      message: 'Something went wrong when processing this request. Tell Nick and he will fix it.',
    });
  }
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
