import { NextApiRequest, NextApiResponse } from 'next';
import { auth, firestore } from 'firebase-admin';
import initializeApi from '../../lib/admin/init';

initializeApi();

const db = firestore();

const REGISTRATION_COLLECTION = '/registrations';

/**
 * Verifies whether the given token belongs to an admin user.
 *
 * @param token A token to verify
 * @returns True if the user is authorized to perform admin data management.
 */
async function userIsAuthorized(token: string) {
  // TODO: Check if token is from actual user using Admin API
  // TODO: Check if token was revoked, and send an appropriate error to client
  const payload = await auth().verifyIdToken(token);
  return true;
}

/**
 * Handles GET requests to /api/scan.
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
  if (!userIsAuthorized(userToken)) {
    res.status(401).send({
      type: 'request-unauthorized',
      message: 'Request is not authorized to perform admin functionality.',
    });
  }

  try {
    const snapshot = await db.collection(REGISTRATION_COLLECTION).doc(bodyData.id).get();
    if (!snapshot.exists)
      return res.status(404).json({ code: 'not found', message: "User doesn't exist..." });

    const data = snapshot.data() as Registration;
    const scans = data.scans ?? [];

    const checkInScan = (
      await db.collection('scan-types').where('isCheckIn', '==', true).get()
    ).docs[0].data().name;

    const isCheckInScan = bodyData.scan === checkInScan;
    const hasCheckedIn = scans.includes(checkInScan);

    if (!isCheckInScan && !hasCheckedIn)
      // if the current scan is not the check in scan and the user hasn't checked in
      return res.status(403).json({ code: 'not checked in', message: "User hasn't checked in" });

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
