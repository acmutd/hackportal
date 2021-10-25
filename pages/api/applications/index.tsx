import { NextApiRequest, NextApiResponse } from 'next';
import { auth, firestore } from 'firebase-admin';
import initializeApi from '../../../lib/admin/init';

initializeApi();

const db = firestore();

const APPLICATIONS_COLLECTION = '/registrations';

const USERS_COLLECTION = '/users';

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

function extractHeaderToken(input: string) {
  const result = input;
  return result;
}

/**
 * Handles GET requests to /api/applications.
 *
 * This returns all applications the user is authorized to see.
 *
 * @param req The HTTP request
 * @param res The HTTP response
 */
async function handleGetApplications(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Handle user authorization
  const {
    query: { token },
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

  try {
    const snapshot = await db.collection(APPLICATIONS_COLLECTION).get();
    const applications: Registration[] = snapshot.docs.map((snap) => {
      // TODO: Verify the application is accurate and report if something is off
      return snap.data() as Registration;
    });
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error when fetching applications', error);
    res.status(500).json({
      code: 'internal-error',
      message: 'Something went wrong when processing this request. Try again later.',
    });
  }
}

/**
 * Handles POST requests to /api/applications.
 *
 * This creates a new application in the database using information given in the
 * request. If a user is not signed in, this route will return a 403
 * Unauthenticated error.
 *
 * @param req The HTTP request
 * @param res The HTTP response
 */
async function handlePostApplications(req: NextApiRequest, res: NextApiResponse) {
  const {} = req.query;
  const applicationBody = req.body;

  let body: any;
  try {
    body = JSON.parse(applicationBody);
  } catch (error) {
    console.error('Could not parse request JSON body');
    res.status(400).json({
      type: 'invalid',
      mesage: '',
    });
    return;
  }

  const applicationDoc = db.collection(APPLICATIONS_COLLECTION).doc();

  const userDoc = db.collection(USERS_COLLECTION).doc();
  // TODO: Get data from user doc, return error if it doesn't exist.

  const userExists = false;
  if (!userExists) {
    res.status(403).send({});
    return;
  }

  // TODO: User query params from request to populate fields
  const application: WithId<Registration> = {
    id: applicationDoc.id,
    timestamp: new Date().getUTCMilliseconds(),
    user: {
      id: '',
      permissions: [],
      firstName: '',
      lastName: '',
      preferredEmail: '',
    },
    age: 0,
    gender: '',
    race: '',
    ethnicity: '',
    university: '',
    major: '',
    studyLevel: '',
    hackathonExperience: 0,
    softwareExperience: '',
    heardFrom: '',
    size: '',
    dietary: '',
    accomodations: '',
    github: '',
    linkedin: '',
    website: '',
    resume: '',
    companies: [],
  };

  try {
    const result = await applicationDoc.set(application);
    res.status(201);
  } catch (error) {
    console.error('Error when storing application in database', error);
    res.status(500);
    return;
  }
  console.info('Application successfully submitted');
}

type ApplicationsResponse = {};

/**
 * Fetches application data.
 *
 * Corresponds to /api/applications route.
 */
export default async function handleApplications(
  req: NextApiRequest,
  res: NextApiResponse<ApplicationsResponse>,
) {
  const { method } = req;

  if (method === 'GET') {
    return handleGetApplications(req, res);
  } else if (method === 'POST') {
    return handlePostApplications(req, res);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
