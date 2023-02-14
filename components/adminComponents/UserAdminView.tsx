import { useEffect, useState } from 'react';
import { RequestHelper } from '../../lib/request-helper';
import { arrayFields, fieldToName, singleFields } from '../../lib/stats/field';
import { useAuthContext } from '../../lib/user/AuthContext';
import { UserData } from '../../pages/api/users';
import ErrorList from '../ErrorList';
import LoadIcon from '../LoadIcon';

interface UserAdminViewProps {
  goBack: () => void;
  currentUserId: string;
  updateCurrentUser: (value: Omit<UserData, 'scans'>) => void;
}

interface UserProfile extends Omit<Registration, 'user'> {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    permissions: string[];
    preferredEmail: string;
  };
}

export default function UserAdminView({
  goBack,
  currentUserId,
  updateCurrentUser,
}: UserAdminViewProps) {
  const [loading, setLoading] = useState(true);
  const [newRole, setNewRole] = useState('');
  const { user } = useAuthContext();
  const [errors, setErrors] = useState<string[]>([]);

  const [currentUser, setCurrentUser] = useState<UserProfile>();

  useEffect(() => {
    async function getUserData() {
      try {
        const { status, data } = await RequestHelper.get<UserProfile>(
          `/api/userinfo?id=${currentUserId}`,
          {
            headers: {
              Authorization: user.token!,
            },
          },
        );
        setCurrentUser(data);
      } catch (error) {
        console.error(error);
        setErrors((prev) => [...prev, 'Unexpected error. Please try again later']);
      } finally {
        setLoading(false);
      }
    }
    getUserData();
  }, []);

  const updateRole = async () => {
    if (!user.permissions.includes('super_admin')) {
      alert('You do not have permission to perform this functionality');
      return;
    }
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
        setCurrentUser({
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

  if (loading) {
    return <LoadIcon height={200} width={200} />;
  }

  return (
    <div className="p-4">
      {errors.length > 0 && (
        <ErrorList
          errors={errors}
          onClose={(idx: number) => {
            const newErrorList = [...errors];
            newErrorList.splice(idx, 1);
            setErrors(newErrorList);
          }}
        />
      )}
      <button
        className="border-2 rounded-lg p-3 bg-gray-200"
        onClick={() => {
          goBack();
        }}
      >
        Go back to User List
      </button>
      <div className="w-full my-5 p-4">
        {user.permissions.includes('super_admin') && (
          <div className="p-3 w-3/5 mx-auto">
            <div className="text-center flex flex-row items-center gap-x-3 my-5">
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
        )}
        <div className="w-3/5 mx-auto border-2 p-6 rounded-xl flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-center">Name</h1>
            <h1 className="font-bold text-center">
              {currentUser.user.firstName + ' ' + currentUser.user.lastName}
            </h1>
          </div>
          <div className="flex flex-col gap-y-2">
            <h1 className="text-center">Role</h1>
            <h1 className="font-bold text-center">{currentUser.user.permissions[0]}</h1>
          </div>
          {singleFields.map((field) => {
            if (!currentUser.hasOwnProperty(field)) return <></>;
            return (
              <div key={field} className="flex flex-col gap-y-2">
                <h1 className="text-center">{fieldToName[field]}</h1>
                <h1 className="font-bold text-center">{currentUser[field]}</h1>
              </div>
            );
          })}
          {arrayFields.map((field) => {
            if (!currentUser.hasOwnProperty(field) || currentUser[field].length === 0) return <></>;
            return (
              <div key={field} className="flex flex-col gap-y-2">
                <h1 className="text-center">{fieldToName[field]}</h1>
                {currentUser[field].map((item: string) => (
                  <h1 key={item} className="font-bold text-center">
                    {item}
                  </h1>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
