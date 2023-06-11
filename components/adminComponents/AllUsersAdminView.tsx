import { useEffect, useState } from 'react';
import { RequestHelper } from '../../lib/request-helper';
import { arrayFields, fieldToName, singleFields } from '../../lib/stats/field';
import { useAuthContext } from '../../lib/user/AuthContext';
import { UserData } from '../../pages/api/users';
import { HackerStatus } from '../../pages/api/acceptreject';
import ErrorList from '../ErrorList';
import LoadIcon from '../LoadIcon';
import UserList from '../adminComponents/UserList';
import { Tab } from '@headlessui/react';

interface UserIdentifier extends Omit<Registration, 'scans'> {
  status: string;
  selected: boolean;
}

interface AllUsersAdminViewProps {
  users: UserIdentifier[];
  selectedUsers: string[];
  searchQuery: string;

  onUserClick: (id: string) => void;
  onUserSelect: (id: string) => void;
  onAcceptReject: (status: string) => void;
  onSearchQueryUpdate: (searchQuery: string) => void;
}

export default function AllUsersAdminView({
  users,
  selectedUsers,
  onUserClick,
  onUserSelect,
  onAcceptReject,
  searchQuery,
  onSearchQueryUpdate,
}: AllUsersAdminViewProps) {
  return (
    <div
      className={`h-full px-14 font-light md:font-semibold lg:font-bold text-sm md:text-baseh-full`}
    >
      {/* Top Bar with Status, Search, and Filters */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-row w-3/4 max-w-6xl">
          {/* Search User */}
          <div className="icon flex flex-row justify-center items-center w-5/12">
            <input
              type="text"
              className="rounded-lg bg-secondary w-full border-none"
              placeholder="Search Users"
              value={searchQuery}
              onChange={(e) => {
                onSearchQueryUpdate(e.target.value);
              }}
            />
          </div>

          {/* Edit Dates */}
          <div className="flex flex-row justify-center items-center w-2/12">
            <button>Edit Dates</button>
          </div>

          {/* Status (Close Registration / Live Registration) */}
          {/* <div className="flex flex-row justify-center items-center w-5/12">
            <div>Close Registration</div>
            <div>Live Registration</div>
          </div> */}
          <Tab.Group
            onChange={(idx) => {
              // if idx == 1, then Live Registration
              // if idx == 0, then Close Registration
            }}
          >
            <Tab.List className="border-2 rounded-2xl">
              <Tab
                className={({ selected }) =>
                  `rounded-2xl ${selected ? 'bg-blue-600 text-white' : ''} p-3`
                }
              >
                Close Registration
              </Tab>
              <Tab
                className={({ selected }) =>
                  `rounded-2xl ${selected ? 'bg-blue-600 text-white' : ''} p-3`
                }
              >
                Live Registration
              </Tab>
            </Tab.List>
          </Tab.Group>
        </div>

        {/* Accept Reject buttons */}
        <div className="flex flex-row w-1/4 justify-around max-w-sm">
          <button
            className="p-3 w-36 rounded-2xl bg-green-200"
            onClick={() => onAcceptReject('Accepted')}
          >
            Accept
          </button>
          <button
            className="p-3 w-36 rounded-2xl bg-red-200"
            onClick={() => onAcceptReject('Rejected')}
          >
            Reject
          </button>
        </div>
      </div>

      {/* User Table List */}
      <div
        className="rounded-lg border-2 border-gray mt-5 mb-10 overflow-y-scroll"
        style={{ height: 'calc(100% - 100px)' }}
      >
        {/* Header */}
        <div
          className={`flex flex-row border-b-2 border-gray px-6 py-3 bg-white justify-between sticky top-0`}
        >
          <div className="w-2/12">Name</div>
          <div className="w-2/12">Status</div>
          <div className="w-4/12">University</div>
          <div className="w-2/12">Major</div>
          <div className="w-2/12">Year</div>
        </div>

        {/* User List */}
        <UserList
          users={users}
          selectedUsers={selectedUsers}
          onUserClick={(id) => onUserClick(id)}
          onUserSelect={(id) => onUserSelect(id)}
        />
      </div>
    </div>
  );
}
