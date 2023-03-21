import { GoogleAuth } from 'google-auth-library';

const ISSUER_ID = process.env.GOOGLE_WALLET_ISSUER_ID;
const CLASS_ID = process.env.GOOGLE_WALLET_CLASS_ID;

//TODO add docs for changing pass object and class definitions
const GENERIC_CLASS = {
  id: `${ISSUER_ID}.${CLASS_ID}`,
  classTemplateInfo: {
    cardTemplateOverride: {
      cardRowTemplateInfos: [
        {
          twoItems: {
            startItem: {
              firstValue: {
                fields: [
                  {
                    fieldPath: "object.textModulesData['studyLevel']",
                  },
                ],
              },
            },
            endItem: {
              firstValue: {
                fields: [
                  {
                    fieldPath: "object.textModulesData['color']",
                  },
                ],
              },
            },
          },
        },
      ],
    },
  },
};

const BASE_URL = 'https://walletobjects.googleapis.com/walletobjects/v1';
const httpClient = new GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_PRIVATE_KEY,
  },
  scopes: 'https://www.googleapis.com/auth/wallet_object.issuer',
});

let initialized = false;

export async function createGenericPassTemplate() {
  if (initialized) {
    console.log('CALLED 1');
    return;
  }

  let response;
  try {
    // Check if the class exists already
    response = await httpClient.request({
      url: `${BASE_URL}/genericClass/${ISSUER_ID}.${CLASS_ID}`,
      method: 'GET',
    });

    console.log('Google Wallet generic class already exists');
    initialized = true;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Class does not exist, create it
      response = await httpClient.request({
        url: `${BASE_URL}/genericClass`,
        method: 'POST',
        data: GENERIC_CLASS,
      });

      console.log('Added Google Wallet generic class');
      initialized = true;
    } else {
      console.log('Failed to check or create Google Wallet pass. Check logs!');
      console.error(error);
    }
  }
}
