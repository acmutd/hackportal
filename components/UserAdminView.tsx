import { useState } from 'react';
import { RequestHelper } from '../lib/request-helper';
import { useAuthContext } from '../lib/user/AuthContext';
import { UserData } from '../pages/api/users';
import ErrorList from './ErrorList';

interface UserAdminViewProps {
  goBack: () => void;
  currentUser: UserData;
  updateCurrentUser: (value: UserData) => void;
}

export default function UserAdminView({
  goBack,
  currentUser,
  updateCurrentUser,
}: UserAdminViewProps) {
  const [newRole, setNewRole] = useState('');
  const { user } = useAuthContext();
  const [errors, setErrors] = useState<string[]>([]);

  const updateRole = async () => {
    try {
      const { status, data } = await RequestHelper.post<
        {
          userId: string;
          newRole: string;
        },
        any
      >(
        '/api/users/roles',
        {
          headers: {
            Authorization: user.token,
          },
        },
        {
          userId: currentUser.id,
          newRole,
        },
      );
      if (!status || data.statusCode >= 400) {
        setErrors([...errors, data.msg]);
      } else {
        alert(data.msg);
        updateCurrentUser({
          ...currentUser,
          user: {
            ...currentUser.user,
            permissions: [newRole],
          },
        });
      }
    } catch (error) {
      console.error(error);
      setErrors((prev) => [...prev, 'Unexpected error. Please try again later']);
    }
    // TODO: Make request to backend to update user roles
  };

  return (
    <div className="p-4">
      <ErrorList
        errors={errors}
        onClose={(idx: number) => {
          const newErrorList = [...errors];
          newErrorList.splice(idx, 1);
          setErrors(newErrorList);
        }}
      />
      <button
        className="border-2 rounded-lg p-3 bg-gray-200"
        onClick={() => {
          goBack();
        }}
      >
        Go back to User List
      </button>
      <div className="w-full my-5 p-4">
        <div className="profile-view">
          <div className="profile-view-name flex flex-col gap-y-2">
            <h1>Name</h1>
            <h1 className="font-bold">
              {currentUser.user.firstName + ' ' + currentUser.user.lastName}
            </h1>
          </div>
          <div className="profile-view-role flex flex-col gap-y-2">
            <h1>Role</h1>
            <h1 className="font-bold">{currentUser.user.permissions[0]}</h1>
          </div>
        </div>
        <div className="flex flex-row items-center gap-x-3 my-5">
          <h1>Change the role of this user to: </h1>
          <select
            value={newRole}
            onChange={(e) => {
              setNewRole(e.target.value);
            }}
            name="new_role"
            className="border-2 rounded-xl p-2"
          >
            <option value="" disabled>
              Choose a role
            </option>
            <option value="super_admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="hacker">Hacker</option>
          </select>
        </div>
        {newRole !== '' && (
          <button
            onClick={() => {
              updateRole();
            }}
            className="border-2 p-3 rounded-lg my-4"
          >
            Update Role
          </button>
        )}
      </div>
    </div>
  );
}
