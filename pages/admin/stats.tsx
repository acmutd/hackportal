import { useAuthContext } from '../../lib/user/AuthContext';
import Head from 'next/head';
import AdminHeader from '../../components/adminComponents/AdminHeader';
import AdminStatsCard from '../../components/adminComponents/AdminStatsCard';
import { RequestHelper } from '../../lib/request-helper';
import { useEffect, useState } from 'react';
import LoadIcon from '../../components/LoadIcon';

import CheckIcon from '@mui/icons-material/Check';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { fieldToName } from '../../lib/stats/field';
import NivoBarChart from '../../components/adminComponents/NivoBarChart';
import NivoPieChart from '../../components/adminComponents/NivoPieChart';

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

export default function AdminStatsPage() {
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useAuthContext();
  const [statsData, setStatsData] = useState<GeneralStats>();

  useEffect(() => {
    async function getData() {
      const { data } = await RequestHelper.get<GeneralStats & { timestamp: any }>('/api/stats', {
        headers: {
          Authorization: user.token,
        },
      });
      setStatsData(data);
      setLoading(false);
    }
    getData();
  }, []);

  if (!isSignedIn || !isAuthorized(user)) {
    return <div className="text-2xl font-black text-center">Unauthorized</div>;
  }

  if (loading) {
    return <LoadIcon width={200} height={200} />;
  }

  return (
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Admin</title>
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
                  items={Object.entries(statsData[key] as Record<any, any>)
                    .sort((a, b) => {
                      const aMonth = parseInt(a[0].substring(0, a[0].indexOf('-')));
                      const aDate = parseInt(a[0].substring(a[0].indexOf('-') + 1));

                      const bMonth = parseInt(b[0].substring(0, b[0].indexOf('-')));
                      const bDate = parseInt(b[0].substring(b[0].indexOf('-') + 1));

                      if (aMonth != bMonth) return aMonth - bMonth;
                      return aDate - bDate;
                    })
                    .map(([k, v]) => ({
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
                    const aMonth = parseInt(a[0].substring(0, a[0].indexOf('-')));
                    const aDate = parseInt(a[0].substring(a[0].indexOf('-') + 1));

                    const bMonth = parseInt(b[0].substring(0, b[0].indexOf('-')));
                    const bDate = parseInt(b[0].substring(b[0].indexOf('-') + 1));

                    if (aMonth != bMonth) return bMonth - aMonth;
                    return bDate - aDate;
                  })
                  .map(([k, v]) => ({
                    itemName: k,
                    itemValue: v,
                  }))}
              />
            );
          })}
      </div>
    </div>
  );
}
