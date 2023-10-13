import UserList from '../adminComponents/UserList';
import { Menu, Tab } from '@headlessui/react';
import { RegistrationState } from '../../lib/util';
import { CheckIcon, FilterIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import FilterComponent from './FilterComponent';
import { useState } from 'react';
import DecisionModal from './DecisionModal';
import { useAuthContext } from '../../lib/user/AuthContext';

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
  filterChecked: FilterProps;
  onFilterChecked: (filter: string) => void;
  applicationDecisions: boolean;
  updateApplicationDecisions: () => void;
}

interface FilterProps {
  hacker: boolean;
  sponsor: boolean;
  organizer: boolean;
  admin: boolean;
  super_admin: boolean;
  accepted: boolean;
  rejected: boolean;
  waiting: boolean;
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
  filterChecked,
  onFilterChecked,
  applicationDecisions,
  updateApplicationDecisions,
}: AllUsersAdminViewProps) {
  const [open, setOpen] = useState(false);

  const { user } = useAuthContext();
  return (
    <div className={`mt-8 md:mt-0 h-full px-14  text-sm md:text-base`}>
      <DecisionModal
        open={open}
        applicationDecisions={applicationDecisions}
        updateApplicationDecisions={updateApplicationDecisions}
        onClose={() => setOpen(false)}
      />
      {/* Top Bar with Status, Search, and Filters */}
      <div className="flex flex-col justify-between">
        {user.permissions[0] === 'super_admin' && (
          <div className="flex flex-col md:flex-row justify-end mb-8 lg:mb-2  space-y-2 md:space-y-0 md:space-x-2">
            <button
              className="flex rounded-md text-primary text-sm md:text-base px-3 py-2 cursor-pointer bg-secondaryDark"
              onClick={() => {
                setOpen(true);
              }}
            >
              {applicationDecisions ? 'Disable Decisions' : 'Enable Decisions'}
            </button>
          </div>
        )}
        <div className="flex flex-col xl:flex-row  justify-between items-center w-full">
          {/* Search User */}
          <div className="relative icon flex flex-row justify-center items-center w-full lg:w-1/2">
            <input
              type="text"
              className={`absolute rounded-lg  md:w-full border-none text-white placeholder:text-white/70
              ${user.permissions[0] == 'super_admin' ? 'bg-primaryDark' : 'bg-primaryDark/50'}
              `}
              placeholder="Search Users"
              value={searchQuery}
              onChange={(e) => {
                onSearchQueryUpdate(e.target.value);
              }}
              disabled={user.permissions[0] != 'super_admin'}
            />
            <div className="absolute flex space-x-2 right-4">
              <Menu>
                <Menu.Button>
                  <FilterIcon
                    className={`w-6 h-6
                  ${
                    (filterChecked.hacker || filterChecked.admin || filterChecked.super_admin) &&
                    (filterChecked.accepted || filterChecked.rejected || filterChecked.waiting)
                      ? 'text-secondaryDark'
                      : 'text-secondary'
                  }`}
                  />
                </Menu.Button>
                <Menu.Items className="absolute border border-primary z-10 left-0 mt-10 w-56 origin-top-right divide-y divide-primaryDark rounded-md bg-secondaryDark">
                  <Menu.Item>
                    <FilterComponent
                      title="Hacker"
                      checked={filterChecked.hacker}
                      onCheck={() => onFilterChecked('hacker')}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <FilterComponent
                      title="Admin"
                      checked={filterChecked.admin}
                      onCheck={() => onFilterChecked('admin')}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <FilterComponent
                      title="Super Admin"
                      checked={filterChecked.super_admin}
                      onCheck={() => onFilterChecked('super_admin')}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <FilterComponent
                      title="Accepted"
                      checked={filterChecked.accepted}
                      onCheck={() => onFilterChecked('accepted')}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <FilterComponent
                      title="Rejected"
                      checked={filterChecked.rejected}
                      onCheck={() => onFilterChecked('rejected')}
                    />
                  </Menu.Item>
                  <Menu.Item>
                    <FilterComponent
                      title="Waiting"
                      checked={filterChecked.waiting}
                      onCheck={() => onFilterChecked('waiting')}
                    />
                  </Menu.Item>
                </Menu.Items>
              </Menu>
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
          {user.permissions[0] === 'super_admin' && <div className="w-1/2 md:w-2/12">Name</div>}
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
