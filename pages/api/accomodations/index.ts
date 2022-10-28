import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();

const REGISTRATIONS_COLLECTION = '/registrations';

async function getAllRecords(req: NextApiRequest, res: NextApiResponse) {
  const records = await db.collection(REGISTRATIONS_COLLECTION).get();
  const accomodations = [];
  records.forEach((doc) => {
    if (doc.data().accomodations.length > 0)
      accomodations.push({
        name: `${doc.data().user.firstName} ${doc.data().user.lastName}`,
        email: doc.data().user.preferredEmail,
        accomodation: doc.data().accomodations,
      });
  });
  return res.json(accomodations);
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;
  const userToken = headers['authorization'];
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);

  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not authorized to perform super admin functionality',
    });
  }

  return getAllRecords(req, res);
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
