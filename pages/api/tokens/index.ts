import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';

initializeApi();
const db = firestore();

const TOKENS_COLLECTION = '/tokens';

async function postTokenToDB(req: NextApiRequest, res: NextApiResponse) {
  try {
    const snapshot = await db
      .collection(TOKENS_COLLECTION)
      .where('token', '==', req.body.token)
      .get();
    if (!snapshot.empty) {
      return res.json({
        msg: 'Token already exists',
      });
    }
    await db.collection(TOKENS_COLLECTION).add(req.body);
    return res.status(200).send({
      msg: 'Token saved',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      msg: 'Server Error',
    });
  }
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  return postTokenToDB(req, res);
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
