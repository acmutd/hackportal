import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../lib/admin/init';
import { firestore } from 'firebase-admin';
import { computeHash, determineColorByTeamIdx } from '../../lib/stats/group';

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
  snapshot.forEach(async (doc) => {
    const docId = doc.id;
    const docData = doc.data();

    users.push({
      id: docData.id,
      user: {
        firstName: docData.user.firstName,
        lastName: docData.user.lastName,
        permissions: docData.user.permissions,
      },
    });

    await doc.ref.update({
      ...docData,
      user: {
        ...docData.user,
        group: determineColorByTeamIdx(computeHash(docId)),
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
