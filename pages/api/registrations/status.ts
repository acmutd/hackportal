import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { firestore } from 'firebase-admin';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const preferenceDoc = await db.collection('miscellaneous').doc('preferences').get();
  return res.status(200).json({
    allowRegistrations: preferenceDoc.data().allowRegistrations ?? false,
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      return handleGetRequest(req, res);
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
