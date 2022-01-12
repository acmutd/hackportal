import { UserData } from '../pages/api/users';

interface UserListProps {
  users: UserData[];
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="w-full flex flex-row flex-wrap">
      {users.map((user, idx) => (
        <div key={idx} className="w-1/4 text-center flex flex-row items-center gap-x-4 my-2">
          <svg height="28" width="28">
            <circle cx="14" cy="14" r="10" fill="#C4C4C4" />
          </svg>
          <h1 className="font-bold">{`${user.user.firstName} ${user.user.lastName}`}</h1>
        </div>
      ))}
    </div>
  );
}
