import { useAuthContext } from '../../lib/user/AuthContext';
import Head from 'next/head';
import AdminHeader from '../../components/AdminHeader';
import AdminStatsCard from '../../components/AdminStatsCard';
import StatsBarChart from '../../components/StatsBarChart';
import { RequestHelper } from '../../lib/request-helper';
import { useEffect, useState } from 'react';
import LoadIcon from '../../components/LoadIcon';

import CheckIcon from '@mui/icons-material/Check';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import StatsPieChart from '../../components/StatsPieChart';

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
      const { data } = await RequestHelper.get<GeneralStats>('/api/stats', {
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
            icon={<SupervisorAccountIcon />}
            title="Super Admin"
            value={statsData.superAdminCount}
          />
        </div>
        <StatsBarChart
          name={'Swag'}
          items={Object.entries(statsData.scans).map(([k, v]) => ({
            itemName: k,
            itemCount: v,
          }))}
        />
        <StatsBarChart
          name={'Dietary'}
          items={Object.entries(statsData.dietary).map(([k, v]) => ({
            itemName: k,
            itemCount: v,
          }))}
        />
        <StatsBarChart
          name={'Shirt Size'}
          items={Object.entries(statsData.size).map(([k, v]) => ({
            itemName: k,
            itemCount: v,
          }))}
        />
        <div className="flex flex-col md:flex-row md:gap-x-6 justify-between items-center">
          <StatsPieChart
            name="Age"
            items={Object.entries(statsData.age).map(([k, v]) => ({
              itemName: k,
              itemCount: v,
            }))}
          />
          <StatsPieChart
            name="Gender"
            items={Object.entries(statsData.gender).map(([k, v]) => ({
              itemName: k,
              itemCount: v,
            }))}
          />
        </div>
        <div className="flex flex-col md:flex-row md:gap-x-6 justify-between items-center">
          <StatsPieChart
            name="Race"
            items={Object.entries(statsData.race).map(([k, v]) => ({
              itemName: k,
              itemCount: v,
            }))}
          />
          <StatsPieChart
            name="Ethnicity"
            items={Object.entries(statsData.ethnicity).map(([k, v]) => ({
              itemName: k,
              itemCount: v,
            }))}
          />
        </div>
        <StatsBarChart
          name={'Companies'}
          items={Object.entries(statsData.companies).map(([k, v]) => ({
            itemName: k,
            itemCount: v,
          }))}
        />
        <StatsBarChart
          name={'University'}
          items={Object.entries(statsData.university).map(([k, v]) => ({
            itemName: k,
            itemCount: v,
          }))}
        />
        {/* {Object.entries(statsData)
          .filter(([_, value]) => typeof value === 'object')
          .map(([key, value]) => (
            <div key={key} className="w-full"></div>
          ))} */}
      </div>
    </div>
  );
}
