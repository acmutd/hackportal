import { useAuthContext } from '../../lib/user/AuthContext';
import Head from 'next/head';
import AdminHeader from '../../components/AdminHeader';
import AdminStatsCard from '../../components/AdminStatsCard';
import StatsTable from '../../components/StatsTable';
import { RequestHelper } from '../../lib/request-helper';
import { useEffect, useState } from 'react';
import LoadIcon from '../../components/LoadIcon';
import { fieldToName } from '../../lib/stats/field';

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
      <div className="p-6 flex flex-col gap-y-6">
        <div className="w-full flex justify-around gap-x-2">
          <AdminStatsCard title="check-ins" value={statsData.checkedInCount} />
          <AdminStatsCard title="hackers" value={statsData.hackerCount} />
          <AdminStatsCard title="admins" value={statsData.adminCount} />
          <AdminStatsCard title="super admin" value={statsData.superAdminCount} />
        </div>
        {Object.entries(statsData)
          .filter(([_, value]) => typeof value === 'object')
          .map(([key, value]) => (
            <div key={key} className="flex justify-around">
              <StatsTable
                name={fieldToName[key]}
                items={Object.entries(value as Record<any, any>).map(([k, v]) => ({
                  itemName: k,
                  itemCount: v,
                }))}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
