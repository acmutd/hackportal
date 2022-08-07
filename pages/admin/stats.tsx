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
import { arrayFields, fieldToName, singleFields } from '../../lib/stats/field';
import FilterComponent from '../../components/FilterComponent';

function isAuthorized(user): boolean {
  if (!user || !user.permissions) return false;
  return (user.permissions as string[]).includes('super_admin');
}

function mergeStatsData(
  statsData: Record<string, Record<'checked_in' | 'not_checked_in', GeneralStats>>,
  checkInFilter: Record<string, boolean>,
  roleFilter: Record<string, boolean>,
): Record<string, GeneralStats> {
  return Object.entries(statsData).reduce((acc, [role, statsDataByRole]) => {
    return {
      ...acc,
      [role]: Object.entries(roleFilter[role] ? statsDataByRole : {}).reduce(
        (roleAcc, [checkedInStatus, checkedInData]) => {
          if (!checkInFilter[checkedInStatus]) return roleAcc;
          return {
            ...roleAcc,
            count: roleAcc.count + checkedInData.count,
            checkedInCount: roleAcc.checkedInCount + checkedInData.checkedInCount,
            ...[...singleFields, ...arrayFields].reduce((fieldAcc, fieldCurr) => {
              return {
                ...fieldAcc,
                [fieldCurr]: Object.entries(checkedInData[fieldCurr] as Record<any, number>).reduce(
                  (qAcc, [qCurr, _]) => ({
                    ...qAcc,
                    [qCurr]: (roleAcc[fieldCurr][qCurr] || 0) + checkedInData[fieldCurr][qCurr],
                  }),
                  {} as Record<any, number>,
                ),
              };
            }, {}),
          };
        },
        {
          count: 0,
          checkedInCount: 0,
          ...[...singleFields, ...arrayFields].reduce(
            (fieldAcc, fieldCurr) => ({
              ...fieldAcc,
              [fieldCurr]: {},
            }),
            {},
          ),
        } as GeneralStats,
      ),
    };
  }, {});
}

export default function AdminStatsPage() {
  const [loading, setLoading] = useState(true);
  const { user, isSignedIn } = useAuthContext();
  const [unfilteredData, setUnfilteredData] = useState<
    Record<string, Record<string, GeneralStats>>
  >({});
  const [statsData, setStatsData] = useState<Record<string, GeneralStats>>();
  const [roles, setRoles] = useState<Record<string, boolean>>({
    hacker: true,
    admin: true,
    super_admin: true,
  });

  const [checkInFilter, setCheckInFilter] = useState<Record<string, boolean>>({
    checked_in: true,
    not_checked_in: true,
  });

  useEffect(() => {
    async function getData() {
      const { data } = await RequestHelper.get<
        Record<string, Record<'checked_in' | 'not_checked_in', GeneralStats>>
      >('/api/stats', {
        headers: {
          Authorization: user.token,
        },
      });
      setUnfilteredData(data);
      setStatsData(mergeStatsData(data, checkInFilter, roles));
      setLoading(false);
    }
    getData();
  }, []);

  useEffect(() => {
    setStatsData(mergeStatsData(unfilteredData, checkInFilter, roles));
  }, [checkInFilter, roles]);

  const updateFilter = (name: string) => {
    setRoles((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
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
        <div className="border-2 rounded-xl p-3">
          <h1 className="text-center text-xl font-bold">Filter Stats by:</h1>
          <FilterComponent
            checked={checkInFilter['checked_in']}
            onCheck={() => {
              setCheckInFilter((prev) => ({ ...prev, checked_in: !prev['checked_in'] }));
            }}
            title="Checked In"
          />

          <FilterComponent
            checked={checkInFilter['not_checked_in']}
            onCheck={() => {
              setCheckInFilter((prev) => ({ ...prev, not_checked_in: !prev['not_checked_in'] }));
            }}
            title="Not checked in"
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
