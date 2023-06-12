import { NextApiRequest, NextApiResponse } from 'next';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';
import initializeApi from '../../../lib/admin/init';
import { firestore } from 'firebase-admin';

initializeApi();
const db = firestore();

async function handleToggleRequest(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;
  const userToken = headers['authorization'];
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);

  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not authorized to perform admin functionality.',
    });
  }

  const preferenceDoc = await db.collection('miscellaneous').doc('preferences').get();
  const preferenceData = {
    ...preferenceDoc.data(),
    allowRegistrations: req.body.allowRegistrations,
  };
  await preferenceDoc.ref.update(preferenceData);
  res.status(200).json({
    msg: `${
      req.body.allowRegistrations ? 'Registration set to open' : 'Registration set to closed'
    }`,
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'POST': {
      return handleToggleRequest(req, res);
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
