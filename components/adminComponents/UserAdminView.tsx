import { useEffect, useRef, useState } from 'react';
import { RequestHelper } from '../../lib/request-helper';
import Pagination from './UserAdminPagination';
import { useAuthContext } from '../../lib/user/AuthContext';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from '@heroicons/react/solid';
import Link from 'next/link';

interface UserAdminViewProps {
  allUsers: UserIdentifier[];
  users: UserIdentifier[];
  currentUserId: string;
  goBack: () => void;
  // updateCurrentUser: (value: Omit<UserIdentifier, 'scans'>) => void;
  onUserClick: (id: string) => void;
  onAcceptReject: (status: string) => void;
  onUpdateRole: (newRole: UserPermission) => void;
}

export default function UserAdminView({
  allUsers,
  users,
  currentUserId,
  goBack,
  onUserClick,
  onAcceptReject,
  onUpdateRole,
}: UserAdminViewProps) {
  let currentUserIndex = 0;
  let currentUser = users.find((user, i) => {
    if (user.id === currentUserId) {
      currentUserIndex = i;
      return true;
    }
    return false;
  });
  if (!currentUser) {
    currentUser = allUsers.find((user, i) => user.id === currentUserId)
  }

  // Contains info of the user who is viewing the data
  const { user: organizer } = useAuthContext();

  const user_info = [
    ['Major', currentUser.major],
    ['University', currentUser.university],
    ['Current Level of Study', currentUser.studyLevel],
    ['Number of Hackathons Attended', currentUser.hackathonExperience],
    ['Software Experience', currentUser.softwareExperience],
    ['Why do you want to attend hackutd?', currentUser.motivation],
    ['Project / Idea', currentUser.projectExample],
    ['What are you looking forward to at HackUTD X?', currentUser.excitedFor],
    [
      'Resume',
      currentUser.resume === '' ||
      currentUser.resume === undefined ||
      organizer.permissions[0] !== 'super_admin' ? (
        'No resume found'
      ) : (
        <Link passHref href={currentUser.resume} className="border-2 p-3 hover:bg-gray-200">
          <a target="_blank" rel="noopener noreferrer" className="hover:underline">
            Click here to download resume
          </a>
        </Link>
      ),
    ],
  ];

  // Pagination
  const ref = useRef(null);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [height, setHeight] = useState(60);
  const [currentPage, setCurrentPage] = useState(1);
  const [newRole, setNewRole] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [isInEditMode, setIsInEditMode] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const h = Math.max(60, ref.current.offsetHeight);
    setHeight(h);
    setCurrentPage(Math.floor(currentUserIndex / Math.floor(h / 60) + 1));
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        goBack();
      }
    };
    window.addEventListener('keydown', handleEsc);
  }, [windowHeight, currentUserIndex]);

  const updateRole = async () => {
    if (!organizer.permissions.includes('super_admin')) {
      alert('You do not have permission to perform this functionality');
      return;
    }
    try {
      const { status, data } = await RequestHelper.post<
        {
          userId: string;
          newRole: string;
        },
        any
      >(
        '/api/users/roles',
        {
          headers: {
            Authorization: organizer.token,
          },
        },
        {
          userId: currentUser.id,
          newRole,
        },
      );
      if (!status || data.statusCode >= 400) {
        setErrors([...errors, data.msg]);
      } else {
        alert(data.msg);
        onUpdateRole(newRole as UserPermission);
      }
    } catch (error) {
      console.error(error);
      setErrors((prev) => [...prev, 'Unexpected error. Please try again later']);
    }
    // TODO: Make request to backend to update user roles
  };

  const pageSize = Math.floor(height / 60);
  const startIndex = (currentPage - 1) * pageSize;
  // 208 px
  return (
    <div className="lg:px-14 flex flex-row justify-between h-full pb-8">
      {/* User List */}
      <div className="hidden md:block md:w-72">
        {/* Page */}
        <div className="overflow-y-hidden h-[calc(100%-40px)]" ref={ref}>
          {users.slice(startIndex, startIndex + pageSize).map((user) => (
            <div
              key={user.id}
              className={`
                flex flex-row justify-between items-center w-full py-2 rounded-md mb-3 h-12 p-4 bg-secondaryDark
                shadow-md ${
                  user.id === currentUserId
                    ? 'border-primaryDark border-[3px] bg-primary'
                    : 'border-primary/50  border-[1px]'
                }
                cursor-pointer
              `}
              onClick={() => onUserClick(user.id)}
            >
              {organizer.permissions[0] === 'super_admin' && (
                <div className="text-primary text-lg font-bold whitespace-nowrap overflow-hidden text-ellipsis max-w-[60%]">
                  {user.user.firstName}
                </div>
              )}
              <div
                className={`py-0.6 px-6 rounded-md  ${
                  user.status === 'Accepted' ? 'text-[#409019] bg-[#84DF58]/25' : ''
                } ${user.status === 'Rejected' ? 'text-[#872852] bg-[#EA609C]/25' : ''}
                  ${user.status === 'Waiting' ? 'text-[#F59E0B] bg-[#FDE68A]/25' : ''}
                  `}
              >
                {user.status}
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalCount={users.length}
          pageSize={pageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* User */}
      <div className="rounded-lg border-2 border-primary h-full overflow-y-scroll w-full md:w-[calc(100%-300px)] bg-secondaryDark/75">
        {/* Header */}
        <div className="sticky top-0 bg-primaryDark shadow-md flex flex-row justify-between items-center py-1 text-secondary">
          <div className="flex items-center gap-x-2 p-3">
            <ChevronLeftIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => onUserClick(users[currentUserIndex - 1]?.id || '')}
            />
            <ChevronRightIcon
              className="h-6 w-6 cursor-pointer"
              onClick={() => onUserClick(users[currentUserIndex + 1]?.id || '')}
            />
          </div>
          <div onClick={goBack} className="p-3">
            <XIcon className="h-6 w-6 cursor-pointer" />
          </div>
        </div>

        {/* User Info */}
        <div className="p-10 animate-text bg-gradient-to-r from-primaryDark to-primary bg-clip-text text-transparent h-full">
          {organizer.permissions[0] === 'super_admin' && (
            <h1 className="font-bold text-5xl">
              {currentUser.user.firstName} {currentUser.user.lastName}
            </h1>
          )}

          {/* User Status */}
          <div className="mt-4">
            <div>
              <h3 className="font-bold text-lg text-primary">Application Status</h3>
              <div className="mt-4 flex flex-col lg:flex-row justify-between items-start">
                <p
                  className={`text-lg font-bold py-1 px-6 rounded-md ${
                    currentUser.status === 'Accepted' ? 'text-[#409019] bg-[#84DF58]/25' : ''
                  } ${currentUser.status === 'Rejected' ? 'text-[#872852] bg-[#EA609C]/25' : ''}
                  ${currentUser.status === 'Waiting' ? 'text-[#F59E0B] bg-[#FDE68A]/25' : ''}
                  `}
                >
                  {currentUser.status}
                </p>

                <div className="flex flex-row justify-between gap-x-3 items-center mt-4 lg:mt-0">
                  <button
                    className="flex flex-row bg-secondary text-primaryDark text-lg font-bold py-2 px-8 rounded-md border-2 border-primaryDark"
                    onClick={() => onAcceptReject('Rejected')}
                  >
                    <XIcon className="w-6 h-6 mr-1 mt-0.5" /> Reject
                  </button>
                  <button
                    className="flex flex-row bg-primaryDark text-secondary text-lg font-bold py-2 px-8 rounded-md"
                    onClick={() => onAcceptReject('Accepted')}
                  >
                    <CheckIcon className="w-6 h-6 mr-1 mt-0.5" /> Accept
                  </button>
                </div>
              </div>
            </div>

            <div className="my-6 w-full border-2 border-secondaryDark rounded-md" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-primary">Role</h3>
                <div className="flex flex-row justify-between">
                  {isInEditMode ? (
                    <div className="flex flex-col">
                      <h1>Change the role of this user to: </h1>
                      <select
                        value={newRole}
                        onChange={(e) => {
                          setNewRole(e.target.value);
                        }}
                        name="new_role"
                        className="mt-2 rounded-md border-2 border-primary p-2 bg-secondaryDark text-primary"
                      >
                        <option value="" disabled>
                          Choose a role
                        </option>
                        <option value="super_admin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="hacker">Hacker</option>
                      </select>
                    </div>
                  ) : (
                    <p className="text-secondary">{currentUser.user.permissions[0]}</p>
                  )}
                </div>
              </div>
              {organizer.permissions.includes('super_admin') &&
                (isInEditMode ? (
                  <div className="flex items-center gap-x-2">
                    <button
                      className="bg-secondary text-primaryDark py-2 px-6 rounded-full border-2 border-primaryDark"
                      onClick={async () => {
                        try {
                          await updateRole();
                          setNewRole('');
                          setIsInEditMode(false);
                        } catch (error) {
                          alert(error);
                        }
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="bg-secondary text-primaryDark py-2 px-6 rounded-full border-2 border-primaryDark"
                      onClick={() => {
                        setNewRole('');
                        setIsInEditMode(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsInEditMode((prev) => !prev)}
                    className="bg-secondary text-primaryDark py-2 px-6 rounded-full border-2 border-primaryDark"
                  >
                    Edit
                  </button>
                ))}
            </div>
          </div>

          {/* Info */}
          <div className="pb-8">
            <div className="mt-5">
              <h3 className="font-bold text-primary">Group</h3>
              <p className="text-secondary">{currentUser.user.group}</p>
            </div>
            {user_info.map(([title, desc], id) => (
              <div key={id} className="mt-5">
                <h3 className="font-bold text-primary">{title}</h3>
                <p className="text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
