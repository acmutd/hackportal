import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { statRecordTypes, statRecords } from '../../hackportal.config';
import initializeApi from '../../lib/admin/init';
import { userIsAuthorized } from '../../lib/authorization/check-authorization';
import { arrayFields, singleFields } from '../../lib/stats/field';

initializeApi();
const db = firestore();

const USERS_COLLECTION = '/registrations';
const SCANTYPES_COLLECTION = '/scan-types';

async function getCheckInEventName() {
  const snapshot = await db.collection(SCANTYPES_COLLECTION).where('isCheckIn', '==', true).get();
  let checkInEventName = '';
  snapshot.forEach((doc) => {
    checkInEventName = doc.data().name;
  });
  return checkInEventName;
}

async function getStatsData() {
  const checkInEventName = await getCheckInEventName();
  // const swagData: Record<string, number> = {};
  const generalStats: Record<string, Record<string, GeneralStats>> = {};
  for (const role of ['hacker', 'admin', 'super_admin']) {
    generalStats[role] = {};
    generalStats[role]['checked_in'] = {
      count: 0,
      checkedInCount: 0,
      scans: {},
      age: {},
      companies: {},
      dietary: {},
      ethnicity: {},
      gender: {},
      hackathonExperience: {},
      heardFrom: {},
      race: {},
      size: {},
      softwareExperience: {},
      studyLevel: {},
      university: {},
    };
    generalStats[role]['not_checked_in'] = {
      count: 0,
      checkedInCount: 0,
      scans: {},
      age: {},
      companies: {},
      dietary: {},
      ethnicity: {},
      gender: {},
      hackathonExperience: {},
      heardFrom: {},
      race: {},
      size: {},
      softwareExperience: {},
      studyLevel: {},
      university: {},
    };
  }

  const addUserToRoleGroup = (userData: any, userPermission: string, checkedInStatus: string) => {
    for (let arrayField of arrayFields) {
      if (!userData[arrayField]) continue;
      userData[arrayField].forEach((data: string) => {
        if (arrayField === 'scans' && data === checkInEventName)
          generalStats[userPermission][checkedInStatus].checkedInCount++;
        else {
          if (!generalStats[userPermission][checkedInStatus][arrayField].hasOwnProperty(data))
            generalStats[userPermission][checkedInStatus][arrayField][data] = 0;
          generalStats[userPermission][checkedInStatus][arrayField][data]++;
        }
      });
    }

    for (let singleField of singleFields) {
      if (!userData[singleField] || userData[singleField] === '') continue;
      if (
        !generalStats[userPermission][checkedInStatus][singleField].hasOwnProperty(
          userData[singleField],
        )
      ) {
        generalStats[userPermission][checkedInStatus][singleField][userData[singleField]] = 0;
      }
      generalStats[userPermission][checkedInStatus][singleField][userData[singleField]]++;
    }

    generalStats[userPermission][checkedInStatus].count++;
  };

  const snapshot = await db.collection(USERS_COLLECTION).get();
  snapshot.forEach((doc) => {
    const userData = doc.data();
    const userPermission = userData.user.permissions[0];
    const userCheckedInStatus =
      userData.scans && userData.scans.includes(checkInEventName) ? 'checked_in' : 'not_checked_in';

    // If a user is a hacker and haven't checked in, then they will be ignored
    addUserToRoleGroup(userData, userPermission, userCheckedInStatus);
  });

  return generalStats;
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const { headers } = req;
  const userToken = headers['authorization'];
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin']);

  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not authorized to perform super admin functionality',
    });
  }

  // Start getting data here
  const statsData = await getStatsData();
  return res.json(statsData);
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  switch (method) {
    case 'GET': {
      return handleGetRequest(req, res);
    }
    default: {
      return res.status(404).json({
        msg: 'Route not found',
      });
    }
  }
}
