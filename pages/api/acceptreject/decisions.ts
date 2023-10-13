import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { firestore } from 'firebase-admin';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const preferenceDoc = await db.collection('miscellaneous').doc('preferences').get();
  return res.status(200).json({
    applicationDecisions: preferenceDoc.data().applicationDecisions ?? false,
  });
}

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
    applicationDecisions: req.body.applicationDecisions,
  };
  await preferenceDoc.ref.update(preferenceData);
  res.status(200).json({
    msg: `${
      req.body.applicationDecisions
        ? 'Application decisions set to open'
        : 'Application decisions set to closed'
    }`,
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      return handleGetRequest(req, res);
    }
    case 'POST': {
      return handleToggleRequest(req, res);
    }
    default: {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
}
