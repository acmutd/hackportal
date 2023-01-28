import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';
import { setApiKey, sendMultiple } from '@sendgrid/mail';

setApiKey(process.env.SENDGRID_API_KEY);

initializeApi();
const db = firestore();

const USERS_COLLECTION = '/registrations';

// TODO set new user type during registration -- hacker, mentor, sponsor, volunteer, etc.
async function getUserEmails(user_types: string[]): Promise<string[]> {
  const emails: string[] = [];
  const users = await db.collection(USERS_COLLECTION).where('type', 'in', user_types).get();
  users.forEach(async (userDoc) => {
    emails.push(userDoc.data().preferredEmail);
  });
  return emails;
}

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  const emailData = JSON.parse(req.body);
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);
  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'Request is not authorized to perform super_admin functionality.',
    });
  }

  // TODO inline image attachment
  const user_emails = await getUserEmails(emailData.user_types);
  const msg = {
    to: user_emails,
    from: process.env.SENDGRID_FROM_EMAIL, // TODO verify domain
    subject: emailData.subject,
    html: emailData.formatted_text,
  };
  sendMultiple(msg);

  return res.status(200).json({
    msg: 'Emails sent',
  });
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  return sendEmail(req, res);
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
