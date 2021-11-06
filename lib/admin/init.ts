import admin from 'firebase-admin';

let apiInitialized = false;
//This path is a JSON object for the Firebase service account's private key
// let servAcc = require('../../private_keys/acmutd-hackportal-firebase-adminsdk-ev404-afcb7fdeb3.json');

/**
 * Initializes all services used to power API routes.
 *
 * Each API's route should must call this function before the handler takes
 * over. To add more services to the back-end API like database services or
 * other middleware, those services should be called in this function.
 */
export default function initializeApi() {
  if (apiInitialized) {
    return;
  }
  // Put API initializations here.
  initializeFirebase();

  apiInitialized = true;
}

/**
 * Initializes Firebase admin APIs using environment variables.
 */
function initializeFirebase() {
  if (admin.apps.length < 1) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID,
        clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
        privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
      }),
    });
  }
}
