import UserList from '../adminComponents/UserList';
import { Tab } from '@headlessui/react';
import { RegistrationState } from '../../lib/util';
import { CheckIcon, SearchIcon, XIcon } from '@heroicons/react/solid';

interface AllUsersAdminViewProps {
  users: UserIdentifier[];
  selectedUsers: string[];
  searchQuery: string;
  registrationState: RegistrationState;
  onUpdateRegistrationState: (newState: RegistrationState) => void;
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
  registrationState,
  onUpdateRegistrationState,
}: AllUsersAdminViewProps) {
  return (
    <div className={`mt-8 md:mt-0 h-full px-14  text-sm md:text-base`}>
      {/* Top Bar with Status, Search, and Filters */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col xl:flex-row  justify-between items-center w-full">
          {/* Search User */}
          <div className="relative icon flex flex-row justify-center items-center w-full lg:w-1/2">
            <input
              type="text"
              className="absolute rounded-lg bg-primaryDark w-full border-none text-white placeholder:text-white/70"
              placeholder="Search Users"
              value={searchQuery}
              onChange={(e) => {
                onSearchQueryUpdate(e.target.value);
              }}
            />
            <div className="absolute right-4">
              <SearchIcon className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Status (Close Registration / Live Registration) */}
          {/* <div className="flex flex-row justify-center items-center w-5/12">
            <div>Close Registration</div>
            <div>Live Registration</div>
          </div> */}
          <div className="flex flex-col xl:flex-row justify-center items-center w-full  mt-8 xl:mt-0">
            <Tab.Group
              selectedIndex={registrationState === RegistrationState.OPEN ? 1 : 0}
              // manual
              onChange={(idx) => {
                onUpdateRegistrationState(
                  idx === 0 ? RegistrationState.CLOSED : RegistrationState.OPEN,
                );
              }}
            >
              <Tab.List className="flex flex-row justify-center items-center w-full">
                <div className="bg-primary rounded-full">
                  <Tab
                    className={`rounded-full ${
                      registrationState === RegistrationState.CLOSED
                        ? 'bg-primaryDark text-white'
                        : 'bg-primary text-white'
                    } py-2 px-4`}
                  >
                    Close Registration
                  </Tab>
                  <Tab
                    className={`rounded-full ${
                      registrationState === RegistrationState.OPEN
                        ? 'bg-primaryDark text-white'
                        : 'bg-primary text-white'
                    } py-2 px-4`}
                  >
                    Live Registration
                  </Tab>
                </div>
              </Tab.List>
            </Tab.Group>

            {/* Accept Reject buttons */}
            <div className="flex flex-col md:flex-row w-full xl:justify-end max-w-sm space-y-2 md:space-y-0 md:space-x-2 mt-4 xl:mt-0">
              <button
                className="flex flex-row bg-[#EA609C]/75 text-white text-lg font-bold py-2 px-8 rounded-md"
                onClick={() => onAcceptReject('Rejected')}
              >
                <XIcon className="w-6 h-6 mr-1 mt-0.5" /> Reject
              </button>
              <button
                className="flex flex-row bg-[#84DF58]/75 text-white text-lg font-bold py-2 px-8 rounded-md"
                onClick={() => onAcceptReject('Accepted')}
              >
                <CheckIcon className="w-6 h-6 mr-1 mt-0.5" /> Accept
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* User Table List */}
      <div
        className="rounded-lg border-2 border-primary mt-5 mb-10 overflow-y-scroll"
        style={{ height: 'calc(100% - 100px)' }}
      >
        {/* Header */}
        <div
          className={`flex flex-row border-b-2 border-primary px-6 py-3 bg-primaryDark text-white justify-between sticky top-0`}
        >
          <div className="w-1/2 md:w-2/12">Name</div>
          <div className="w-1/2 md:w-2/12">Status</div>
          <div className="w-4/12  hidden md:block">University</div>
          <div className="w-2/12 hidden md:block">Major</div>
          <div className="w-2/12  hidden md:block">Year</div>
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
