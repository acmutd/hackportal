import { auth, firestore } from 'firebase-admin';

const REGISTRATION_COLLECTION = '/registrations';

export async function userIsAuthorized(token: string) {
  // TODO: Check if token is from actual user using Admin API
  // TODO: Check if token was revoked, and send an appropriate error to client
  if (!token) return false;
  const payload = await auth().verifyIdToken(token);
  const snapshot = await firestore()
    .collection(REGISTRATION_COLLECTION)
    .where('id', '==', payload.uid)
    .get();
  if (snapshot.empty) return false;
  return (snapshot.docs[0].data().user.permissions as string[]).includes('admin');
}
