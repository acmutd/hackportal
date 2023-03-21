import { NextApiRequest, NextApiResponse } from 'next';
import initializeApi from '../../../lib/admin/init';
import { sign as signJwt } from 'jsonwebtoken';
import { userIsAuthorized } from '../../../lib/authorization/check-authorization';
import { createGenericPassTemplate } from '../../../lib/passbook/google-wallet';

initializeApi();
createGenericPassTemplate();

const ISSUER_ID = process.env.GOOGLE_WALLET_ISSUER_ID;
const CLASS_ID = process.env.GOOGLE_WALLET_CLASS_ID;

async function createUserPass(req: NextApiRequest, res: NextApiResponse) {
  const profileData = JSON.parse(req.body);
  const userToken = req.headers['authorization'] as string;
  const isAuthorized = await userIsAuthorized(userToken);

  if (!isAuthorized) {
    return res.status(403).json({
      statusCode: 403,
      msg: 'You must be at least a hacker to use this functionality',
    });
  }

  //TODO add docs for changing pass object modules and class definitions
  let genericPassObject = {
    id: `${ISSUER_ID}.${profileData.uid}`,
    classId: `${ISSUER_ID}.${CLASS_ID}`,
    logo: {
      sourceUri: {
        uri: 'https://repository-images.githubusercontent.com/381515549/c4473d9c-8f40-4570-851f-86cc7210743a',
      },
      contentDescription: {
        defaultValue: {
          language: 'en',
          value: '',
        },
      },
    },
    cardTitle: {
      defaultValue: {
        language: 'en',
        value: 'HackPortal',
      },
    },
    subheader: {
      defaultValue: {
        language: 'en',
        value: 'Name',
      },
    },
    header: {
      defaultValue: {
        language: 'en',
        value: profileData.name,
      },
    },
    textModulesData: [
      {
        id: 'studyLevel',
        header: 'STUDY LEVEL',
        body: profileData.studyLevel
          .toLowerCase()
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' '),
      },
      {
        id: 'color',
        header: 'COLOR',
        body: profileData.color,
      },
    ],
    barcode: {
      type: 'QR_CODE',
      value: `hack:${profileData.uid}`,
      alternateText: null,
    },
    hexBackgroundColor: '#4285f4',
    heroImage: {
      sourceUri: {
        uri: 'https://hackutd.co/svg/hackutdix_3.svg',
      },
      contentDescription: {
        defaultValue: {
          language: 'en',
          value: 'Join us at HackUTD!',
        },
      },
    },
  };

  const claims = {
    iss: process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_CLIENT_EMAIL,
    aud: 'google',
    origins: [],
    typ: 'savetowallet',
    payload: {
      genericObjects: [genericPassObject],
    },
  };

  const token = signJwt(claims, process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_PRIVATE_KEY, {
    algorithm: 'RS256',
  });
  return res.status(200).json({ gPayUrl: `https://pay.google.com/gp/v/save/${token}` });
}

function handlePostRequest(req: NextApiRequest, res: NextApiResponse) {
  return createUserPass(req, res);
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
