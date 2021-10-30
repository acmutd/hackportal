interface UserListProps {
  users: Array<
    Array<{
      name: string;
      role: string[];
    }>
  >;
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="w-full">
      {users.map((row, idx1) => (
        <div key={idx1} className="flex flex-row gap-y-4">
          {row.map((user, idx2) => (
            <div key={idx2} className="w-1/4 text-center flex flex-row items-center gap-x-4">
              <svg height="28" width="28">
                <circle cx="14" cy="14" r="10" fill="#C4C4C4" />
              </svg>
              <h1 className="font-bold">{user.name}</h1>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
