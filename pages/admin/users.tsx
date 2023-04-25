import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import AdminHeader from '../../components/adminComponents/AdminHeader';
import FilterComponent from '../../components/adminComponents/FilterComponent';
import UserList from '../../components/adminComponents/UserList';
import { RequestHelper } from '../../lib/request-helper';
import { UserData } from '../api/users';
import { useAuthContext } from '../../lib/user/AuthContext';
import UserAdminView from '../../components/adminComponents/UserAdminView';
import { isAuthorized } from '.';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type UserIdentifier = Omit<UserData, 'scans'>;

/**
 *
 * The User Dashboard of Admin Console. Shows all users that are registered in the system.
 *
 * Route: /admin/users
 *
 */
export default function UserPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<Registration[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [ascending, setAscending] = useState(null);
  const { user } = useAuthContext();

  let timer: NodeJS.Timeout;

  const [filter, setFilter] = useState({
    hacker: true,
    sponsor: true,
    organizer: true,
    admin: true,
    super_admin: true,
  });

  async function fetchAllUsers() {
    setLoading(true);
    if (!user) return;

    const { data } = await RequestHelper.get<Registration[]>('/api/applications', {
      headers: {
        Authorization: user.token,
      },
    });

    setUsers(data);
    setFilteredUsers([...data]);
    setLoading(false);
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (loading) return;

    let timer = setTimeout(() => {
      if (searchQuery !== '') {
        const newFiltered = users.filter(
          ({ user }) =>
            `${user.firstName} ${user.lastName}`
              .toLowerCase()
              .indexOf(searchQuery.toLowerCase()) !== -1,
        );
        setFilteredUsers(newFiltered);
      } else {
        setFilteredUsers([...users]);
      }
    }, 750);
    setAscending(null);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, loading, users]);

  const updateFilter = (name: string) => {
    const filterCriteria = {
      ...filter,
      [name]: !filter[name],
    };
    const newFilteredUser = users.filter(({ user }) => {
      for (let category of Object.keys(filterCriteria)) {
        if (filterCriteria[category] && user.permissions.includes(category as UserPermission)) {
          return true;
        }
      }
      return false;
    });
    setAscending(null);
    setFilteredUsers(newFilteredUser);
    setFilter(filterCriteria);
  };

  const sortByName = () => {
    if (!ascending) {
      setFilteredUsers((prev) =>
        [...prev].sort((a, b) => {
          const nameA = a.user.firstName + ' ' + a.user.lastName;
          const nameB = b.user.firstName + ' ' + b.user.lastName;
          return nameA.localeCompare(nameB);
        }),
      );
      setAscending(true);
    } else {
      setFilteredUsers((prev) => [...prev].reverse());
      setAscending(false);
    }
  };

  if (!user || !isAuthorized(user))
    return <div className="text-2xl font-black text-center">Unauthorized</div>;

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="2xl:px-32 md:px-8 px-4">
      <Head>
        <title>HackPortal - Admin</title> {/* !change */}
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <section id="subheader" className="my-4">
        <AdminHeader />
      </section>
      {currentUser === '' ? (
        <>
          <div className="flex flex-row items-center gap-x-2 mt-4 2xl:mt-8">
            <input
              type="text"
              className="rounded-lg px-2 py-1 grow sm:grow-0 sm:w-3/5 md:w-2/5 2xl:w-1/3 bg-secondary border-transparent focus:border-primaryDark caret-primaryDark"
              placeholder="Search Users"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            ></input>
          </div>

          {/* Filters */}
          <div className="lg:flex text-complementaryDark lg:gap-x-16 my-4">
            <div className="flex items-center">
              <h1 className="text-lg font-semibold md:mr-4">Filters:</h1>
              <section className="flex gap-x-4">
                <FilterComponent
                  checked={filter['hacker']}
                  onCheck={() => {
                    updateFilter('hacker');
                  }}
                  title="Hackers"
                />
                {/* <FilterComponent
                  checked={filter['sponsor']}
                  onCheck={() => {
                    updateFilter('sponsor');
                  }}
                  title="Sponsors"
                /> */}
                {/* <FilterComponent
                  checked={filter['organizer']}
                  onCheck={() => {
                    updateFilter('organizer');
                  }}
                  title="Organizers"
                /> */}
                <FilterComponent
                  checked={filter['admin']}
                  onCheck={() => {
                    updateFilter('admin');
                  }}
                  title="Admin"
                />
                <FilterComponent
                  checked={filter['super_admin']}
                  onCheck={() => {
                    updateFilter('super_admin');
                  }}
                  title="Super Admin"
                />
              </section>
            </div>
          </div>

          {/* User Table */}
          <div className="border-2 border-complementary/20 rounded-md flex flex-col 2xl:h-[65vh] md:h-[60vh] h-[65vh]">
            {/* Titles */}
            <div className="flex text-complementary 2xl:text-2xl md:text-lg text-base font-bold border-b-2 border-complementary/20 p-3">
              <div className="lg:basis-[29%] md:basis-[25%] basis-[23%] flex items-center gap-x-1">
                Name
                <button className="" onClick={() => sortByName()}>
                  {ascending == null ? (
                    <UnfoldMoreIcon />
                  ) : ascending ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </button>
              </div>
              <div className="lg:basis-[29%] md:basis-[33%] basis-[35%]">University</div>
              <div className="lg:basis-[29%] md:basis-[29%] basis-[29%]">Major</div>
              <div className="lg:basis-[13%] md:basis-[13%] basis-[13%]">Year</div>
            </div>
            <div className="h-full overflow-y-scroll">
              <UserList
                hasAdminPrivilege={
                  user.permissions.includes('super_admin') || user.permissions.includes('admin')
                }
                users={filteredUsers}
                onItemClick={(id) => {
                  setCurrentUser(id);
                }}
              />
            </div>
          </div>
        </>
      ) : (
        <UserAdminView
          currentUserId={currentUser}
          goBack={() => {
            setCurrentUser('');
          }}
          updateCurrentUser={(value) => {
            setUsers((prev) => prev.map((obj) => (obj.id === value.id ? { ...value } : obj)));
          }}
        />
      )}
    </div>
  );
}
