import { useAuthContext } from '../../lib/user/AuthContext';
import Head from 'next/head';
import AdminHeader from '../../components/AdminHeader';
import AdminStatsCard from '../../components/AdminStatsCard';
import SwagStatsTable from '../../components/SwagStatsTable';
import { RequestHelper } from '../../lib/request-helper';
import { useEffect, useState } from 'react';
import LoadIcon from '../../components/LoadIcon';

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

interface StatsData {
  adminCount: number;
  checkedInCount: number;
  hackerCount: number;
  superAdminCount: number;
  swags: Record<string, number>;
}

export default function AdminStatsPage() {
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useAuthContext();
  const [statsData, setStatsData] = useState<StatsData>();

  useEffect(() => {
    async function getData() {
      const { data } = await RequestHelper.get<StatsData>('/api/stats', {
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
    <div
      className="flex flex-col flex-grow"
      style={{
        // backgroundImage: "url('../assets/background.png')",
        minHeight: 500,
        backgroundSize: 'cover',
      }}
    >
      <Head>
        <title>HackPortal - Admin</title>
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <AdminHeader />
      <div className="p-6 flex flex-col gap-y-6 text-black">
        <div className="w-full flex justify-around gap-x-2">
          <AdminStatsCard title="check-ins" value={statsData.checkedInCount} />
          <AdminStatsCard title="hackers" value={statsData.hackerCount} />
          <AdminStatsCard title="admins" value={statsData.adminCount} />
          <AdminStatsCard title="super admin" value={statsData.superAdminCount} />
        </div>
        <div className="flex justify-around">
          <SwagStatsTable
            swags={Object.entries(statsData.swags).map(([k, v]) => ({ swag: k, claimedCount: v }))}
          />
        </div>
      </div>
    </div>
  );
}
