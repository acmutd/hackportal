import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

/*
  To test this file alone:
  - First set up your own AWS SES service and AWS IAM credentials (set right policies for AWS SES)
  - Then un-comment the run() below
  - Finally run these commands:
    npx tsc index.ts
    node index.js
*/

/*
  Resources:
  - Example AWS SES for Javacript: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_ses_code_examples.html
  - Same as above but in Github: https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/ses/src/ses_sendemail.js#L16
  - AWS SES Dashboards
  - AWS IAM Dashboard: For creating users + keys with permissions instead of root user
*/

// Set the AWS Region.
const REGION = 'us-east-2';
// Create SES service object.
const sesClient = new SESClient({
  region: REGION,
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  },
});

const createSendEmailCommand = (toAddress: string, fromAddress: string) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [
        /* more items */
      ],
      ToAddresses: [
        toAddress,
        /* more To-email addresses */
      ],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: 'UTF-8',
          Data: 'HTML_FORMAT_BODY',
        },
        Text: {
          Charset: 'UTF-8',
          Data: 'TEXT_FORMAT_BODY',
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'EMAIL_SUBJECT',
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async () => {
  const sendEmailCommand = createSendEmailCommand('doanhtu07@gmail.com', 'doanhtu07@gmail.com');

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (e) {
    console.error('Failed to send email.');
    return Promise.reject(e);
  }
};

// run().catch((err) => {
//   console.error(err);
// });

const module = { sesClient, createSendEmailCommand };
export default module;
