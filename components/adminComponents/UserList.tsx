import { UserData } from '../../pages/api/users';

interface UserListProps {
  hasAdminPrivilege: boolean;
  users: Registration[];
  onItemClick: (id: string) => void;
}

export default function UserList({ users, onItemClick, hasAdminPrivilege }: UserListProps) {
  return (
    <div className="w-full">
      {users.map((user, idx) => (
        <div
          key={idx}
          className={`w-full p-3 text-complementary flex odd:bg-complementary/[.05] even:bg-white ${
            hasAdminPrivilege ? 'cursor-pointer hover:bg-complementary/[0.2]' : ''
          }`}
          onClick={() => {
            if (hasAdminPrivilege) onItemClick(user.id);
          }}
        >
          <div className="lg:basis-[29%] md:basis-[25%] basis-[23%] lg:text-base sm:text-sm text-xs">{`${user.user.firstName} ${user.user.lastName}`}</div>
          <div className="lg:basis-[29%] md:basis-[33%] basis-[35%] lg:text-base sm:text-sm text-xs">
            {user.university}
          </div>
          <div className="lg:basis-[29%] md:basis-[29%] basis-[29%] lg:text-base sm:text-sm text-xs">
            {user.major}
          </div>
          <div className="lg:basis-[13%] md:basis-[13%] basis-[13%] lg:text-base sm:text-sm text-xs">
            {user.studyLevel}
          </div>
        </div>
      ))}
    </div>
  );
}
