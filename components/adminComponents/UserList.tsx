interface UserListProps {
  users: UserIdentifier[];
  selectedUsers: string[];

  onUserClick: (id: string) => void;
  onUserSelect: (id: string) => void;
}

export default function UserList({
  users,
  selectedUsers,
  onUserClick,
  onUserSelect,
}: UserListProps) {
  const userList = [];

  users.forEach((user, idx) => {
    const bgColor = idx % 2 ? 'bg-white' : 'bg-gray-100';

    userList.push(
      <div
        key={user.id}
        className={`
          flex flex-row justify-between px-6
          cursor-pointer hover:bg-gray-200 items-center 
          ${bgColor}

          
        `}
        onClick={() => onUserClick(user.id)}
      >
        {/*
          Name
          Status
          University
          Major
          Year
        */}
        <div
          className={`flex w-1/2 md:w-2/12 h-full py-3 pr-6 items-center text-complementary text-base`}
          onClick={(e) => {
            e.stopPropagation();
            // onUserSelect(user.id);
          }}
        >
          <div>
            <input
              onChange={(e) => {
                e.stopPropagation();
                onUserSelect(user.id);
              }}
              checked={user.selected}
              type="checkbox"
              className="w-4 h-4 mr-2 rounded-sm border-[1px] border-complementary bg-transparent text-primaryDark"
            />
          </div>
          <div
            className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%]"
            onClick={(e) => {
              e.stopPropagation();
              onUserClick(user.id);
            }}
          >
            {`${user.user.firstName} ${user.user.lastName}`}
          </div>
        </div>
        <div className="w-1/2 md:w-2/12 h-full py-3 pr-6 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100%]">
          <span
            className={` py-1 px-6 rounded-md ${
              user.status === 'Accepted' ? 'text-[#409019] bg-[#84DF58]/25' : ''
            } ${user.status === 'Rejected' ? 'text-[#872852] bg-[#EA609C]/25' : ''}
                  ${user.status === 'Waiting' ? 'text-[#F59E0B] bg-[#FDE68A]/25' : ''}`}
          >
            {user.status}
          </span>
        </div>
        <div className="hidden md:block text-base text-complementary w-4/12 h-full py-3 pr-6 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100%]">
          {user.university}
        </div>
        <div className="hidden md:block text-base text-complementary w-2/12 h-full py-3 pr-6 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100%]">
          {user.major}
        </div>
        <div className="hidden md:block text-base text-complementary w-2/12 h-full py-3 pr-6 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100%]">
          {user.studyLevel}
        </div>
      </div>,
    );
  });

  return <div className="w-full">{userList}</div>;
}
