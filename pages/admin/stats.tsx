import { useAuthContext } from '../../lib/user/AuthContext';
import Head from 'next/head';
import AdminHeader from '../../components/AdminHeader';
import AdminStatsCard from '../../components/AdminStatsCard';
import { RequestHelper } from '../../lib/request-helper';
import { useEffect, useState } from 'react';
import LoadIcon from '../../components/LoadIcon';

import CheckIcon from '@mui/icons-material/Check';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { fieldToName } from '../../lib/stats/field';
import NivoBarChart from '../../components/NivoBarChart';
import NivoPieChart from '../../components/NivoPieChart';

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

interface AccomodationData {
  name: string;
  email: string;
  accomodation: string;
}

export default function AdminStatsPage() {
  const [loading, setLoading] = useState(true);
  const [accomodationData, setAccomodationData] = useState<AccomodationData[]>([]);
  const { user, isSignedIn } = useAuthContext();
  const [statsData, setStatsData] = useState<GeneralStats>();

  useEffect(() => {
    async function getData() {
      const { data } = await RequestHelper.get<GeneralStats & { timestamp: any }>('/api/stats', {
        headers: {
          Authorization: user.token,
        },
      });
      const { data: accomodationData_ } = await RequestHelper.get<AccomodationData[]>(
        '/api/accomodations',
        {
          headers: {
            Authorization: user.token,
          },
        },
      );
      setStatsData(data);
      setAccomodationData(accomodationData_);
      setLoading(false);
    }
    getData();
  }, []);

  if (!isSignedIn || !isAuthorized(user)) {
    return (
      <div className="background h-screen">
        <div className="md:text-4xl sm:text-2xl text-xl text-white font-medium text-center mt-[6rem]">
          Unauthorized
        </div>
      </div>
    );
  }

  if (loading) {
    return <LoadIcon width={200} height={200} />;
  }

  return (
    <div className="flex flex-col flex-grow home text-white">
      <Head>
        <title>HackUTD IX - Admin</title>
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <AdminHeader />
      <div className="w-full xl:w-3/5 mx-auto p-6 flex flex-col gap-y-6">
        <div className="flex-col gap-y-3 w-full md:flex-row flex justify-around gap-x-2">
          <AdminStatsCard icon={<CheckIcon />} title="Check-Ins" value={statsData.checkedInCount} />
          <AdminStatsCard
            icon={<AccountCircleIcon />}
            title="Hackers"
            value={statsData.hackerCount}
          />
          <AdminStatsCard
            icon={<SupervisorAccountIcon />}
            title="Admins"
            value={statsData.adminCount}
          />
          <AdminStatsCard
            icon={<EngineeringIcon />}
            title="Super Admin"
            value={statsData.superAdminCount}
          />
        </div>
        {Object.entries(statsData)
          .filter(([k, v]) => typeof v === 'object')
          .map(([key, value]) => {
            if (Object.keys(value).length <= 6)
              return (
                <NivoPieChart
                  key={key}
                  name={fieldToName[key]}
                  items={Object.entries(statsData[key] as Record<any, any>).map(([k, v]) => ({
                    id: k,
                    value: v,
                  }))}
                />
              );
            return (
              <NivoBarChart
                key={key}
                name={fieldToName[key]}
                items={Object.entries(statsData[key] as Record<any, any>)
                  .sort((a, b) => {
                    if (key !== 'timestamp') return -1;
                    const [aMonth, aDate] = a[0].split('-');
                    const [bMonth, bDate] = b[0].split('-');
                    if (parseInt(aMonth) != parseInt(bMonth))
                      return parseInt(aMonth) - parseInt(bMonth);
                    return parseInt(aDate) - parseInt(bDate);
                  })
                  .map(([k, v]) => ({
                    itemName: k,
                    [fieldToName[key]]: v,
                  }))}
              />
            );
          })}
        <div className="border-2 my-2 rounded-2xl md:p-6">
          <h1 className="text-2xl font-bold text-center">Accomodations</h1>
          {accomodationData.map((accomodation, idx) => (
            <div key={idx} className="flex flex-row items-center gap-x-2 my-3">
              <div className="rounded-lg w-full py-2 md:px-4 px-2 announcements">
                <h1>
                  Name: <span className="font-bold text-white">{accomodation.name}</span>
                </h1>
                <h1>Accomodation: {accomodation.accomodation}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
