import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../lib/admin/init';
import { firestore } from 'firebase-admin';

initializeApi();
const db = firestore();

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NODE_ENV !== 'development') {
    return res.status(404).json({
      msg: 'Route not found',
    });
  }
  const snapshot = await db.collection('/registrations').get();
  const users = [];
  snapshot.forEach((doc) => {
    users.push({
      id: doc.data().id,
      user: {
        firstName: doc.data().user.firstName,
        lastName: doc.data().user.lastName,
        permissions: doc.data().user.permissions,
      },
    });
  });
  await db.collection('/miscellaneous').doc('allusers').set({ users });
  return res.json({
    msg: 'Operation completed',
  });
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      return handleGetRequest(req, res);
    }
    default: {
      return res.end();
    }
  }
}
