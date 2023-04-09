import { UserData } from '../../pages/api/users';

interface UserListProps {
  users: UserData[];

  onUserClick: (id: string) => void;
  onUserSelect: (id: string) => void;
}

export default function UserList({ users, onUserClick, onUserSelect }: UserListProps) {
  return (
    <div className="w-full">
      {users.map((user, idx) => (
        <div
          key={user.id}
          className={`
            flex flex-row justify-between px-6 py-3
            ${idx % 2 ? 'bg-white' : 'bg-gray-100'}
            cursor-pointer hover:bg-gray-200
          `}
          onClick={() => {
            onUserClick(user.id);
          }}
        >
          <div className="w-2/12">Zach</div>
          <div className="w-2/12">Accepted</div>
          <div className="w-4/12">The University of Texas at Dallas</div>
          <div className="w-2/12">Computer Science</div>
          <div className="w-2/12">Sophomore</div>
        </div>
      ))}
    </div>
  );
}
