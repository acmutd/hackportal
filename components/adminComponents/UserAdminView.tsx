import { useEffect, useState } from 'react';
import { RequestHelper } from '../../lib/request-helper';
import { arrayFields, fieldToName, singleFields } from '../../lib/stats/field';
import { useAuthContext } from '../../lib/user/AuthContext';
import { UserData } from '../../pages/api/users';
import ErrorList from '../ErrorList';
import LoadIcon from '../LoadIcon';

interface UserAdminViewProps {
  users: UserData[];
  goBack: () => void;
  currentUserId: string;
  updateCurrentUser: (value: Omit<UserData, 'scans'>) => void;
}

export default function UserAdminView({
  users,
  goBack,
  currentUserId,
  updateCurrentUser,
}: UserAdminViewProps) {
  return (
    <div className="px-10 flex flex-row justify-evenly h-full">
      {/* User List */}
      <div className="w-2/12 h-full">
        <div className="overflow-y-hidden" style={{ height: 'calc(100% - 40px)' }}>
          {users.map((user, idx) => (
            <div
              key={user.id}
              className={`flex flex-row justify-between px-4 py-2 rounded-md border-2 border-gray mb-3`}
            >
              <div>{user.user.firstName}</div>
              <div>Accepted</div>
            </div>
          ))}
        </div>
        <div>1 2 3 4 5 6</div>
      </div>

      {/* User */}
      <div className="rounded-lg border-2 border-gray w-9/12">
        {/* Header */}
        <div className="border-b-2 border-gray">Left arrow Right arrow</div>

        {/* User Info */}
        <div className="px-10">
          <h1>Zach</h1>

          {/* User Status */}
          <div>
            <div>
              <h3>Application Status</h3>
              <div className="flex flex-row justify-between">
                <div>Pending</div>

                <div className="flex flex-row">
                  <button>Accept</button>
                  <button>Reject</button>
                </div>
              </div>
            </div>

            <div>
              <h3>Role</h3>
              <div className="flex flex-row justify-between">
                <div>Hacker</div>
                <button>Edit</button>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <div>
              <h2>Major</h2>
              <div>Mathematics</div>
            </div>
            <div>
              <h2>University</h2>
              <div>The University of Texas at Dallas</div>
            </div>
            <div>
              <h2>Current Level of Study</h2>
              <div>Sophomore</div>
            </div>
            <div>
              <h2>Number of Hackathons Attended</h2>
              <div>3</div>
            </div>
            <div>
              <h2>Types of Events Interested In</h2>
              <div>Tech talks, technical workshops</div>
            </div>
            <div>
              <h2>Other Comments</h2>
              <div>Mathematics</div>
            </div>
            <div>
              <h2>Resume</h2>
              <div>Mathematics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
