import { firestore } from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { fieldNames, statRecordTypes } from '../../hackportal.config';
import initializeApi from '../../lib/admin/init';
import { userIsAuthorized } from '../../lib/authorization/check-authorization';
import { arrayFields, singleFields } from '../../lib/stats/field';

initializeApi();
const db = firestore();

const USERS_COLLECTION = '/registrations';
const DECISIONS_COLLECTION = '/acceptreject';
const SCANTYPES_COLLECTION = '/scan-types';

async function getCheckInEventName() {
  const snapshot = await db.collection(SCANTYPES_COLLECTION).where('isCheckIn', '==', true).get();
  let checkInEventName = '';
  snapshot.forEach((doc) => {
    checkInEventName = doc.data().name;
  });
  return checkInEventName;
}

async function getStatsData(userId: string) {
  const checkInEventName = await getCheckInEventName();
  // const swagData: Record<string, number> = {};
  const statRecords: any = {};
  for (const field in fieldNames) {
    statRecords[field] = {};
  }

  const generalStats: GeneralStats & statRecordTypes = {
    superAdminCount: 0,
    checkedInCount: 0,
    hackerCount: 0,
    adminCount: 0,
    rejectedCount: 0,
    acceptedCount: 0,
    reviewedCount: 0,
    scans: {},
    timestamp: {},
    group: {},
    ...statRecords,
  };

  const snapshot = await db.collection(USERS_COLLECTION).get();
  snapshot.forEach((doc) => {
    const userData = doc.data();
    const date = doc.createTime.toDate();
    const stringDate = `${date.getMonth() + 1}-${date.getDate()}`;

    if (!generalStats.timestamp.hasOwnProperty(stringDate)) {
      generalStats.timestamp[stringDate] = 0;
    }
    generalStats.timestamp[stringDate]++;

    const userTeam = doc.data().user.group;
    if (!generalStats.group.hasOwnProperty(userTeam)) {
      generalStats.group[userTeam] = 0;
    }
    generalStats.group[userTeam]++;

    for (let arrayField of arrayFields) {
      if (!userData[arrayField]) continue;
      userData[arrayField].forEach((data: string) => {
        if (arrayField === 'scans' && data === checkInEventName) generalStats.checkedInCount++;
        else if (generalStats[arrayField]) {
          if (!generalStats[arrayField].hasOwnProperty(data)) generalStats[arrayField][data] = 0;
          generalStats[arrayField][data]++;
        }
      });
    }

    for (let singleField of singleFields) {
      if (!userData[singleField] || userData[singleField] === '') continue;
      if (!generalStats[singleField].hasOwnProperty(userData[singleField])) {
        generalStats[singleField][userData[singleField]] = 0;
      }
      generalStats[singleField][userData[singleField]]++;
    }

    const userPermission = userData.user.permissions[0];

    switch (userPermission) {
      case 'super_admin': {
        generalStats.superAdminCount++;
        break;
      }
      case 'admin': {
        generalStats.adminCount++;
        break;
      }
      case 'hacker': {
        generalStats.hackerCount++;
        break;
      }
    }
  });

  const decisionsSnapshot = await db.collection(DECISIONS_COLLECTION).get();
  decisionsSnapshot.forEach((doc) => {
    const data = doc.data();
    const decision = data.status ?? '';
    const whoReviewed = data.adminId ?? '';
    if (decision) generalStats[`${decision.toLowerCase()}Count`] += 1;
    if (whoReviewed === userId) generalStats.reviewedCount += 1;
  });

  return generalStats;
}

async function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const {
    headers,
    query: { id },
  } = req;
  const userToken = headers['authorization'];
  const isAuthorized = await userIsAuthorized(userToken, ['super_admin', 'admin']);

  if (!isAuthorized) {
    return res.status(403).json({
      msg: 'Request is not authorized to perform super admin functionality',
    });
  }

  // Start getting data here
  const statsData = await getStatsData(id as string);
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
