import { NextApiRequest, NextApiResponse } from 'next';
import { auth, firestore } from 'firebase-admin';
import initializeApi from '../../lib/admin/init';

initializeApi();

const db = firestore();

const REGISTRATION_COLLECTION = '/registrations';

async function userIsAuthorized(token: string, queryId: string) {
  if (!token) return false;
  try {
    const payload = await auth().verifyIdToken(token);
    if (payload.uid === queryId) return true;
    const snapshot = await firestore()
      .collection(REGISTRATION_COLLECTION)
      .where('id', '==', payload.uid)
      .get();
    if (snapshot.empty) return false;
    for (let userRole of snapshot.docs[0].data().user.permissions as string[]) {
      if (userRole === 'super_admin' || userRole === 'admin') return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
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
  const isAuthorized = await userIsAuthorized(userToken, id as string);
  if (!isAuthorized) {
    return res.status(401).send({
      type: 'request-unauthorized',
      message: 'Request is not authorized to perform admin functionality.',
    });
  }

  const userID = id as string;

  try {
    const snapshot = await db.collection(REGISTRATION_COLLECTION).doc(userID).get();
    if (!snapshot.exists)
      return res.status(404).json({ code: 'not found', message: "User doesn't exist..." });

    const userData = snapshot.data();
    // User doesn't have "points" field, add it rq
    if (userData.user.points === undefined) {
      userData.user.points = 0;
      await db.collection(REGISTRATION_COLLECTION).doc(userID).set(userData);
    }

    const leaderboard = await db.collection("/miscellaneous").doc("leaderboard").get()
    const pointCutoff = leaderboard.data().pointCutoff
    const statusSnapshot = await db.collection('acceptreject').get();
    const statusData = statusSnapshot.docs.map((doc) => doc.data());
    //look for hackId in acceptreject collection
    const statusValue = statusData.find((doc) => doc.hackerId === userID);
    const status = statusValue?.status ? statusValue?.status : 'Waiting';
    return res.status(200).json({ ...userData, status: status, blanketEligible: userData.user.points >= pointCutoff });
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
