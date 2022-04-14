import { UserData } from '../pages/api/users';

interface UserListProps {
  hasSuperAdminPrivilege: boolean;
  users: UserData[];
  onItemClick: (id: string) => void;
}

export default function UserList({ users, onItemClick, hasSuperAdminPrivilege }: UserListProps) {
  return (
    <div className="w-full flex flex-row flex-wrap">
      {users.map((user, idx) => (
        <div
          key={idx}
          className={`w-1/4 text-center flex flex-row items-center gap-x-4 my-2 p-2 rounded-lg ${
            hasSuperAdminPrivilege ? 'cursor-pointer hover:bg-violet-850 hover:text-white' : ''
          }`}
          onClick={() => {
            if (hasSuperAdminPrivilege) onItemClick(user.id);
          }}
        >
          <svg height="28" width="28">
            <circle cx="14" cy="14" r="10" fill="#C4C4C4" />
          </svg>
          <h1 className="font-bold">{`${user.user.firstName} ${user.user.lastName}`}</h1>
        </div>
      ))}
    </div>
  );
}
