import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';
import { setApiKey, sendMultiple } from '@sendgrid/mail';
import nc from 'next-connect';
import multer from 'multer';

setApiKey(process.env.SENDGRID_API_KEY);

initializeApi();
const db = firestore();

const USERS_COLLECTION = '/registrations';

interface NCNextApiRequest extends NextApiRequest {
  files: Express.Multer.File[];
}

const handler = nc<NCNextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.log(err);
    res.status(500).json({
      msg: 'Server error',
    });
  },
  onNoMatch: (req, res, next) => {
    res.status(404).json({
      msg: 'Route not found',
    });
  },
});

// TODO set new user type during registration -- hacker, mentor, sponsor, volunteer, etc.
async function getUserEmails(user_types: string[]): Promise<string[]> {
  const emails: string[] = [];
  const users = await db.collection(USERS_COLLECTION).where('type', 'in', user_types).get();
  users.forEach(async (userDoc) => {
    emails.push(userDoc.data().preferredEmail);
  });
  return emails;
}

async function sendEmail(req: NCNextApiRequest, res: NextApiResponse) {
  const emailData = JSON.parse(req.body);
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);
  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'Request is not authorized to perform super_admin functionality.',
    });
  }

  const user_emails = await getUserEmails(emailData.user_types);
  const attachments = [];
  for (let i = 0; i < req.files.length; i++) {
    const file = req.files[i];
    attachments.push({
      content: file.buffer.toString('base64'),
      filename: file.originalname,
      type: file.mimetype,
      // content id used to reference the image in the email body
      content_id: 'image' + i,
      disposition: 'attachment',
    });
  }

  const msg = {
    to: user_emails,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL, // Domain must be verified in SendGrid
      name: process.env.SENDGRID_FROM_NAME,
    },
    subject: emailData.subject,
    html: emailData.formatted_text,
    attachments: attachments,
  };

  sendMultiple(msg).catch((err) => {
    console.log(err);
    res.status(500).json({
      msg: 'Server error',
    });
  });

  return res.status(200).json({
    msg: 'Emails sent',
  });
}

// Limit image attachments to no more than 10
handler.use(multer().array('images', 10));
handler.post(async (req, res) => await sendEmail(req, res));

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

export default handler;
