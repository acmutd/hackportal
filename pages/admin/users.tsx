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
  const [users, setUsers] = useState<UserIdentifier[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserIdentifier[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState('');

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

    const { data } = await RequestHelper.get<UserIdentifier[]>('/api/users', {
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
    timer = setTimeout(() => {
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
        if (filterCriteria[category] && user.permissions.includes(category)) {
          return true;
        }
      }
      return false;
    });
    setFilteredUsers(newFilteredUser);
    setFilter(filterCriteria);
  };

  const sortByName = () => {
    setFilteredUsers((prev) =>
      [...prev].sort((a, b) => {
        const nameA = a.user.firstName + ' ' + a.user.lastName;
        const nameB = b.user.firstName + ' ' + b.user.lastName;
        return nameA.localeCompare(nameB);
      }),
    );
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
    <div className="flex flex-col flex-grow">
      <Head>
        <title>HackPortal - Admin</title> {/* !change */}
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <section id="subheader" className="p-2 md:p-4">
        <AdminHeader />
      </section>
      {currentUser === '' ? (
        <>
          <div className="top-6 p-2 md:p-4 flex flex-row items-center gap-x-2">
            <h1 className="font-bold text-lg">Search Users</h1>
            <input
              type="text"
              className="rounded-lg px-2 py-1 grow sm:grow-0 sm:w-3/5 md:w-2/5 bg-secondary"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
            />
          </div>
          <div className="p-2 md:p-4 flex flex-col md:flex-row w-full">
            <div className="w-full md:w-1/6 lg:w-1/12 flex flex-col md:gap-y-4">
              <div className="flex md:inline items-center">
                <h1 className="text-md font-bold">Filters</h1>
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
              </div>
              <div className="md:my-4 flex md:inline">
                <h1 className="text-md font-bold mb-4">Sort By:</h1>
                <h4
                  className="text-sm md:text-md underline cursor-pointer mx-4 md:mx-0"
                  onClick={() => {
                    sortByName();
                  }}
                >
                  Alphabetically
                </h4>
              </div>
            </div>
            <div className="w-full md:px-8">
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
