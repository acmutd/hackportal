import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';

initializeApi();
const db = firestore();
const SCANTYPES_COLLECTION = '/scan-types';
const REGISTRATION_COLLECTION = '/registrations';

async function checkIfNameAlreadyExists(name: string) {
  const snapshot = await db.collection(SCANTYPES_COLLECTION).where('name', '==', name).get();
  return !snapshot.empty;
}

async function checkIfCheckInAlreadyExists() {
  const snapshot = await db.collection(SCANTYPES_COLLECTION).where('isCheckIn', '==', true).get();
  return !snapshot.empty;
}

async function updateUserDoc(oldScanName: string, newScanName: string) {
  try {
    const snapshot = await db.collection(REGISTRATION_COLLECTION).get();
    snapshot.forEach(async (doc) => {
      if (doc.data().scans) {
        const newScans = doc
          .data()
          .scans.map((scan) => (scan === oldScanName ? newScanName : scan));
        await db
          .collection(REGISTRATION_COLLECTION)
          .doc(doc.id)
          .update({
            ...doc.data(),
            scans: newScans,
          });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function updateScanType(req: NextApiRequest, res: NextApiResponse) {
  const { scanData } = req.body;
  scanData.name = scanData.name.trim();
  try {
    const snapshot = await db
      .collection(SCANTYPES_COLLECTION)
      .where('precedence', '==', scanData.precedence)
      .get();
    if (snapshot.empty) {
      return res.status(404).json({
        msg: 'ScanTypes not found',
      });
    }

    if (await checkIfNameAlreadyExists(scanData.name)) {
      return res.status(400).json({
        msg: 'Scantype already exists',
      });
    }

    if (scanData.isCheckIn) {
      const hasCheckIn = await checkIfCheckInAlreadyExists();
      if (hasCheckIn) {
        return res.status(400).json({
          msg: 'Check-in scantype already exists',
        });
      }
    }

    snapshot.forEach(async (doc) => {
      await updateUserDoc(doc.data().name, scanData.name);
      await db.collection(SCANTYPES_COLLECTION).doc(doc.id).update(scanData);
    });
    return res.status(200).json({
      msg: 'update completed',
    });
  } catch (error) {
    return res.status(500).json({
      msg: 'Unexpected error. Please try again later',
    });
  }
}

async function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);
  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not allowed to perform super admin functionality',
    });
  }

  return updateScanType(req, res);
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
