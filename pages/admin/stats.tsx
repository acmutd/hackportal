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
import EngineeringIcon from '@mui/icons-material/Engineering';
import StatsPieChart from '../../components/StatsPieChart';
import { fieldToName } from '../../lib/stats/field';
import FilterComponent from '../../components/FilterComponent';

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

export default function AdminStatsPage() {
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useAuthContext();
  const [statsData, setStatsData] = useState<Record<string, GeneralStats>>();
  const [roles, setRoles] = useState<Record<string, boolean>>({
    hacker: true,
    admin: true,
    super_admin: true,
  });

  useEffect(() => {
    async function getData() {
      const { data } = await RequestHelper.get<Record<string, GeneralStats>>('/api/stats', {
        headers: {
          Authorization: user.token,
        },
      });
      setStatsData(data);
      setLoading(false);
    }
    getData();
  }, []);

  const updateFilter = (name: string) => {
    const newFilter = { ...roles };
    newFilter[name] = !newFilter[name];
    setRoles(newFilter);
  };

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
        <div className="border-2 rounded-xl p-3">
          <h1 className="text-center text-xl font-bold">Filter Stats by:</h1>

          <FilterComponent
            checked={roles['hacker']}
            onCheck={() => {
              updateFilter('hacker');
            }}
            title="Hackers"
          />

          <FilterComponent
            checked={roles['admin']}
            onCheck={() => {
              updateFilter('admin');
            }}
            title="Admin"
          />
          <FilterComponent
            checked={roles['super_admin']}
            onCheck={() => {
              updateFilter('super_admin');
            }}
            title="Super Admin"
          />
        </div>
        <div className="flex-col gap-y-3 w-full md:flex-row flex justify-around gap-x-2">
          <AdminStatsCard
            icon={<CheckIcon />}
            title="Check-Ins"
            value={Object.entries(statsData)
              .filter(([k, v]) => roles[k])
              .reduce((acc, [k, v]) => acc + v.checkedInCount, 0)}
          />
          <AdminStatsCard
            icon={<AccountCircleIcon />}
            title="Hackers"
            value={statsData['hacker'].count}
          />

          <AdminStatsCard
            icon={<SupervisorAccountIcon />}
            title="Admins"
            value={statsData['admin'].count}
          />
          <AdminStatsCard
            icon={<EngineeringIcon />}
            title="Super Admin"
            value={statsData['super_admin'].count}
          />
        </div>
        {Object.entries(statsData['hacker'])
          .filter(([k, v]) => typeof v === 'object')
          .map(([key, value]) => {
            if (Object.keys(value).length <= 6)
              return (
                <StatsPieChart
                  key={key}
                  name={fieldToName[key]}
                  fieldName={key}
                  statsData={statsData}
                  rolesDict={roles}
                />
              );
            return (
              <StatsBarChart
                key={key}
                name={fieldToName[key]}
                fieldName={key}
                statsData={statsData}
                rolesDict={roles}
              />
            );
          })}
      </div>
    </div>
  );
}
