import { UserData } from '../../pages/api/users';

interface UserIdentifier extends Omit<Registration, 'scans'> {
  status: String;
}

interface UserListProps {
  users: UserIdentifier[];
  selectedUsers: String[];

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
    const bgColor = selectedUsers.includes(user.id)
      ? 'bg-secondary hover:bg-secondary'
      : idx % 2
      ? 'bg-white'
      : 'bg-gray-100';

    userList.push(
      <div
        key={user.id}
        className={`
          flex flex-row justify-between px-6
          cursor-pointer hover:bg-gray-200
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
          className={`flex w-2/12 h-full py-3 pr-6`}
          onClick={(e) => {
            e.stopPropagation();
            onUserSelect(user.id);
          }}
        >
          <div>Square</div>
          <div className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[70%]">
            {`${user.user.firstName} ${user.user.lastName}`}
          </div>
        </div>
        <div className="w-2/12 h-full py-3 pr-6 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100%]">
          {user.status}
        </div>
        <div className="w-4/12 h-full py-3 pr-6 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100%]">
          {user.university}
        </div>
        <div className="w-2/12 h-full py-3 pr-6 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100%]">
          {user.major}
        </div>
        <div className="w-2/12 h-full py-3 pr-6 whitespace-nowrap overflow-hidden text-ellipsis max-w-[100%]">
          {user.studyLevel}
        </div>
      </div>,
    );
  });

  return <div className="w-full">{userList}</div>;
}
