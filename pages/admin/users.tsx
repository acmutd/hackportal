import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
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
import { RegistrationState } from '../../lib/util';
import { Dialog, Transition } from '@headlessui/react';

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
  const [registrationStatus, setRegistrationStatus] = useState(RegistrationState.UNINITIALIZED);
  const [nextRegistrationStatus, setNextRegistrationStatus] = useState(
    RegistrationState.UNINITIALIZED,
  );

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

  async function fetchInitData() {
    setLoading(true);
    setNextRegistrationStatus(RegistrationState.UNINITIALIZED);
    if (!user) return;

    const allowRegistrationState = (
      await RequestHelper.get<{ allowRegistrations: boolean }>('/api/registrations/status', {
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

    setRegistrationStatus(
      allowRegistrationState.allowRegistrations ? RegistrationState.OPEN : RegistrationState.CLOSED,
    );
    const hackerStatusMapping: Map<string, string> = new Map();
    hackersStatus.forEach((hackerStatus) =>
      hackerStatusMapping.set(hackerStatus.hackerId, hackerStatus.status),
    );

    const usersData = (
      await RequestHelper.get<UserIdentifier[]>('/api/users', {
        headers: {
          Authorization: user.token,
        },
      })
    )['data'].map((userData) => ({
      ...userData,
      status: hackerStatusMapping.has(userData.id)
        ? hackerStatusMapping.get(userData.id)
        : 'Waiting',
      selected: false,
    }));

    setUsers(usersData);
    setFilteredUsers([...usersData.filter((user) => user.user.permissions.includes('hacker'))]);
    setLoading(false);
  }

  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    if (loading) return;
    timer = setTimeout(() => {
      if (searchQuery !== '') {
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

  const handleUserSelect = (id: string) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, selected: !user.selected } : user)),
    );
    setFilteredUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, selected: !user.selected } : user)),
    );
    if (selectedUsers.includes(id)) {
      setSelectedUsers([...selectedUsers.filter((v) => v != id)]);
      return;
    }
    setSelectedUsers([...selectedUsers, id]);
  };

  const postHackersStatus = (status: string) => {
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
      headers: {
        Authorization: user.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          alert('Hackers update failed...');
        } else {
          setUsers((prev) =>
            prev.map((user) => ({
              ...user,
              status: hackerIds.includes(user.id) ? status : user.status,
              selected: false,
            })),
          );
          setFilteredUsers((prev) =>
            prev.map((user) => ({
              ...user,
              selected: false,
              status: hackerIds.includes(user.id) ? status : user.status,
            })),
          );
          alert('Hackers update success');
        }
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setSelectedUsers([]);
      });
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
      <Transition
        appear
        show={
          nextRegistrationStatus === RegistrationState.OPEN ||
          nextRegistrationStatus === RegistrationState.CLOSED
        }
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setNextRegistrationStatus(RegistrationState.UNINITIALIZED)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    Update Registration Status
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {nextRegistrationStatus === RegistrationState.OPEN
                        ? 'Are you sure you want to allow registration?'
                        : 'Are you sure you want to disable registration?'}
                    </p>
                  </div>

                  <div className="mt-4 flex gap-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={async () => {
                        try {
                          await RequestHelper.post<
                            { allowRegistrations: boolean },
                            { msg: string }
                          >(
                            '/api/registrations/toggle',
                            {
                              headers: {
                                'Content-Type': 'application/json',
                                Authorization: user.token,
                              },
                            },
                            {
                              allowRegistrations: nextRegistrationStatus === RegistrationState.OPEN,
                            },
                          );
                          alert('Registration state updated successfully');
                          setRegistrationStatus(nextRegistrationStatus);
                        } catch (error) {
                          alert(error);
                        } finally {
                          setNextRegistrationStatus(RegistrationState.UNINITIALIZED);
                        }
                      }}
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setNextRegistrationStatus(RegistrationState.UNINITIALIZED)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
            onUpdateRegistrationState={(newState) => {
              setNextRegistrationStatus(newState);
            }}
            onUserSelect={(id) => handleUserSelect(id)}
            onAcceptReject={(status) => postHackersStatus(status)}
            searchQuery={searchQuery}
            onSearchQueryUpdate={(searchQuery) => {
              setSearchQuery(searchQuery);
            }}
            registrationState={registrationStatus}
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
            onUpdateRole={(newRole) => {
              setUsers((users) =>
                users.map((user) =>
                  user.id !== currentUser
                    ? { ...user }
                    : { ...user, user: { ...user.user, permissions: [newRole] } },
                ),
              );
              setFilteredUsers((users) =>
                users.map((user) =>
                  user.id !== currentUser
                    ? { ...user }
                    : { ...user, user: { ...user.user, permissions: [newRole] } },
                ),
              );
            }}
          />
        )}
      </div>
    </div>
  );
}
