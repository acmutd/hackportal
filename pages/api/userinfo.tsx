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
 * Handles GET requests to /api/scantypes.
 *
 * This returns all scantypes the user is authorized to see.
 *
 * @param req The HTTP request
 * @param res The HTTP response
 */
async function handleUserInfo(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle user authorization
  const {
    query: { token, id },
    headers,
  } = req;

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

  const userID = id as string;

  try {
    const snapshot = await db.collection(REGISTRATION_COLLECTION).doc(userID).get();
    if (!snapshot.exists)
      return res.status(404).json({ code: 'not found', message: "User doesn't exist..." });
    let permissions = snapshot.data().user.permissions ?? [];
    res.status(200).json({ permissions });
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

  if (method === 'GET') {
    handleUserInfo(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
