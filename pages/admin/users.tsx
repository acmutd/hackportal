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
import AllUsersAdminView from '../../components/adminComponents/AllUsersAdminView';

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
      <div style={{ height: 'calc(100vh - 180px)' }}>
        {currentUser === '' ? (
          <AllUsersAdminView
            users={filteredUsers}
            onUserClick={(id) => setCurrentUser(id)}
            onUserSelect={(id) => {}}
          />
        ) : (
          <UserAdminView
            users={filteredUsers}
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
    </div>
  );
}
