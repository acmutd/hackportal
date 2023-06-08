import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import AdminHeader from '../../components/adminComponents/AdminHeader';
import FilterComponent from '../../components/adminComponents/FilterComponent';
import UserList from '../../components/adminComponents/UserList';
import { RequestHelper } from '../../lib/request-helper';
// import { UserData } from '../api/users';
import { HackerStatus } from '../api/acceptreject';
import { useAuthContext } from '../../lib/user/AuthContext';
import UserAdminView from '../../components/adminComponents/UserAdminView';
import { isAuthorized } from '.';
import AllUsersAdminView from '../../components/adminComponents/AllUsersAdminView';

interface UserIdentifier extends Omit<Registration, 'scans'> {
  status: string;
}

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

  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

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

    const usersData = (
      await RequestHelper.get<UserIdentifier[]>('/api/users', {
        headers: {
          Authorization: user.token,
        },
      })
    )['data'];

    const hackersStatus = (
      await RequestHelper.get<HackerStatus[]>(`/api/acceptreject?adminId=${user.id}`, {
        headers: {
          Authorization: user.token,
        },
      })
    )['data'];

    const accepted = [],
      rejected = [];

    for (const hackerStatus of hackersStatus) {
      if (hackerStatus.status === 'Accepted') accepted.push(hackerStatus.hackerId);
      else if (hackerStatus.status === 'Rejected') rejected.push(hackerStatus.hackerId);
      else throw 'Unknown status';
    }

    for (const userData of usersData) {
      userData.status = accepted.includes(userData.id)
        ? 'Accepted'
        : rejected.includes(userData.id)
        ? 'Rejected'
        : 'Waiting';
    }

    setUsers(usersData);
    setFilteredUsers([...usersData.filter((user) => user.user.permissions.includes('hacker'))]);
    setLoading(false);
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    if (loading) return;
    timer = setTimeout(() => {
      if (searchQuery !== '') {
        console.log(searchQuery);
        const newFiltered = users.filter(
          ({ user }) =>
            `${user.firstName.trim()} ${user.lastName.trim()}`
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
      for (let category of Object.keys(filterCriteria) as UserPermission[]) {
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

  const handleUserSelect = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers([...selectedUsers.filter((v) => v != id)]);
      return;
    }
    setSelectedUsers([...selectedUsers, id]);
  };

  const postHackersStatus = (status) => {
    const hackerIds = selectedUsers.filter(
      (id) => users.find((user) => user.id == id).status !== status,
    );

    if (hackerIds.length === 0) return;

    fetch('/api/acceptreject', {
      method: 'post',
      body: JSON.stringify({
        adminId: user.id,
        hackerIds,
        status,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        alert('Hackers update failed...');
        return;
      }
      const newUsers = [...users];
      for (const user of newUsers) {
        if (hackerIds.includes(user.id)) user.status = status;
      }

      setUsers(newUsers);

      alert('Hackers update success');
    });

    setSelectedUsers([]);
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
    <div className="flex flex-col flex-grow items-center">
      <Head>
        <title>HackPortal - Admin</title> {/* !change */}
        <meta name="description" content="HackPortal's Admin Page" />
      </Head>
      <section id="subheader" className="p-2 md:p-4">
        <AdminHeader />
      </section>
      <div className="w-full max-w-screen-2xl" style={{ height: 'calc(100vh - 180px)' }}>
        {currentUser === '' ? (
          <AllUsersAdminView
            users={filteredUsers}
            selectedUsers={selectedUsers}
            onUserClick={(id) => {
              setSelectedUsers([id]);
              setCurrentUser(id);
            }}
            onUserSelect={(id) => handleUserSelect(id)}
            onAcceptReject={(status) => postHackersStatus(status)}
            searchQuery={searchQuery}
            onSearchQueryUpdate={(searchQuery) => {
              setSearchQuery(searchQuery);
            }}
          />
        ) : (
          <UserAdminView
            users={filteredUsers}
            currentUserId={currentUser}
            goBack={() => setCurrentUser('')}
            onUserClick={(id) => {
              setSelectedUsers([id]);
              setCurrentUser(id);
            }}
            onAcceptReject={(status) => postHackersStatus(status)}
          />
        )}
      </div>
    </div>
  );
}
