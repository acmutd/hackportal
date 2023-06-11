import { useEffect, useRef, useState } from 'react';
import { RequestHelper } from '../../lib/request-helper';
import { UserData } from '../../pages/api/users';
import Pagination from './UserAdminPagination';

interface UserAdminViewProps {
  users: UserIdentifier[];
  currentUserId: string;
  goBack: () => void;
  // updateCurrentUser: (value: Omit<UserIdentifier, 'scans'>) => void;
  onUserClick: (id: string) => void;
  onAcceptReject: (status: string) => void;
}

export default function UserAdminView({
  users,
  currentUserId,
  goBack,
  onUserClick,
  onAcceptReject,
}: UserAdminViewProps) {
  let currentUserIndex = 0;
  const currentUser = users.find((user, i) => {
    if (user.id === currentUserId) {
      currentUserIndex = i;
      return true;
    }
    return false;
  });

  const user_info = [
    ['Major', currentUser.major],
    ['University', currentUser.university],
    ['Current Level of Study', currentUser.studyLevel],
    ['Number of Hackathons Attended', currentUser.hackathonExperience],
    ['Software Experience', currentUser.softwareExperience],
    ['Resume', currentUser.resume],
  ];

  // Pagination
  const ref = useRef(null);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [height, setHeight] = useState(60);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const h = Math.max(60, ref.current.offsetHeight);
    setHeight(h);
    setCurrentPage(Math.floor(currentUserIndex / Math.floor(h / 60) + 1));
    console.log(h, currentUserIndex);
  }, [windowHeight, currentUserIndex]);

  const pageSize = Math.floor(height / 60);
  const startIndex = (currentPage - 1) * pageSize;
  // 208 px
  return (
    <div className="px-14 flex flex-row justify-between h-full">
      {/* User List */}
      <div className="w-52 h-full">
        {/* Page */}
        <div className="overflow-y-hidden" style={{ height: 'calc(100% - 40px)' }} ref={ref}>
          {users.slice(startIndex, startIndex + pageSize).map((user) => (
            <div
              key={user.id}
              className={`
                flex flex-row justify-between items-center px-4 py-2 rounded-md mb-3 h-12
                border-2 ${user.id === currentUserId ? 'border-primary' : 'border-gray'}
                cursor-pointer
              `}
              onClick={() => onUserClick(user.id)}
            >
              <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[60%]">
                {user.user.firstName}
              </div>
              <div>{user.status}</div>
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
      <div className="rounded-lg border-2 border-gray p-3" style={{ width: 'calc(100% - 260px)' }}>
        {/* Header */}
        <div className="border-b-2 border-gray flex flex-row justify-between items-center py-1">
          <div className="flex items-center gap-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div onClick={goBack}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* User Info */}
        <div className="p-10">
          <h1 className="font-bold text-4xl">
            {currentUser.user.firstName} {currentUser.user.lastName}
          </h1>

          {/* User Status */}
          <div className="mt-4">
            <div>
              <h3 className="font-bold">Application Status</h3>
              <div className="flex flex-row justify-between items-center">
                <p className="text-lg">{currentUser.status}</p>

                <div className="flex flex-row gap-x-3">
                  <button
                    className="bg-green-200 text-lg p-3 rounded-xl"
                    onClick={() => onAcceptReject('Accepted')}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-200 text-lg p-3 rounded-xl"
                    onClick={() => onAcceptReject('Rejected')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>

            <div className="my-6 w-full border-2 border-secondary rounded-md" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">Role</h3>
                <div className="flex flex-row justify-between">
                  <p>Hacker</p>
                </div>
              </div>
              <button className="bg-secondary py-2 px-3 rounded-lg">Edit</button>
            </div>
          </div>

          {/* Info */}
          <div>
            {user_info.map(([title, desc], id) => (
              <div key={id} className="mt-5">
                <h3 className="font-bold">{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
