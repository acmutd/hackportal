import { NextApiRequest, NextApiResponse } from 'next';
import { auth, firestore } from 'firebase-admin';
import initializeApi from '../../lib/admin/init';
import { userIsAuthorized } from '../../lib/authorization/check-authorization';

initializeApi();

const db = firestore();

const REGISTRATION_COLLECTION = '/registrations';
const SCANTYPES_COLLECTION = '/scan-types';

// Used to dictate that user attempted to claim swag without checking in
const ILLEGAL_SCAN_NAME = 'Illegal Scan';

/**
 *
 * Check if a user has checked in into the event
 *
 * @param scans list of scantypes
 * @return true if user has checked in, false otherwise
 */
async function userAlreadyCheckedIn(scans: string[]) {
  if (scans.length === 0) return false;
  const snapshot = await db.collection(SCANTYPES_COLLECTION).where('name', 'in', scans).get();
  let ok = false;
  snapshot.forEach((doc) => {
    if (doc.data().isCheckIn) {
      ok = true;
    }
  });
  return ok;
}

/**
 *
 * Check if provided scan name corresponds to a check in scan-type
 *
 * @param scan name of scan
 * @returns true if scan name corresponds to a check-in scan-type, false otherwise
 */
async function checkIfScanIsCheckIn(scan: string) {
  const snapshot = await db.collection(SCANTYPES_COLLECTION).where('name', '==', scan).get();
  let ok = false;
  snapshot.forEach((doc) => {
    if (doc.data().isCheckIn) {
      ok = true;
    }
  });
  return ok;
}

/**
 * Handles GET requests to /api/scantypes.
 *
 * This returns all scantypes the user is authorized to see.
 *
 * @param req The HTTP request
 * @param res The HTTP response
 */
async function handleScan(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle user authorization
  const {
    query: { token },
    body,
    headers,
  } = req;

  const bodyData = JSON.parse(body);

  //
  // Check if request header contains token
  // TODO: Figure out how to handle the string | string[] mess.
  const userToken = (token as string) || (headers['authorization'] as string);
  // TODO: Extract from bearer token
  // Probably not safe
  const isAuthorized = await userIsAuthorized(userToken);
  if (!isAuthorized) {
    return res.status(401).send({
      type: 'request-unauthorized',
      message: 'Request is not authorized to perform admin functionality.',
    });
  }

  try {
    const snapshot = await db.collection(REGISTRATION_COLLECTION).doc(bodyData.id).get();
    if (!snapshot.exists)
      return res.status(404).json({ code: 'not found', message: "User doesn't exist..." });
    let scans = snapshot.data().scans ?? [];

    const userCheckedIn = await userAlreadyCheckedIn(scans);
    const scanIsCheckInEvent = await checkIfScanIsCheckIn(bodyData.scan);

    if (!userCheckedIn && !scanIsCheckInEvent) {
      scans.push(ILLEGAL_SCAN_NAME);
      await db.collection(REGISTRATION_COLLECTION).doc(bodyData.id).update({ scans });
      return res.status(403).json({
        code: 'not-checked-in',
        message: 'User has not checked in',
      });
    }

    if (scans.includes(bodyData.scan)) return res.status(201).json({ code: 'duplicate' });
    scans.push(bodyData.scan);
    await db.collection(REGISTRATION_COLLECTION).doc(bodyData.id).update({ scans });
    res.status(200).json({});
  } catch (error) {
    console.error('Error when fetching applications', error);
    res.status(500).json({
      code: 'internal-error',
      message: 'Something went wrong when processing this request. Try again later.',
    });
  }
}

type ApplicationsResponse = {};

/**
 * Fetches scantype data.
 *
 * Corresponds to /api/scantypes route.
 */
export default async function handleScanTypes(
  req: NextApiRequest,
  res: NextApiResponse<ApplicationsResponse>,
) {
  const { method } = req;

  if (method === 'POST') {
    return handleScan(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
