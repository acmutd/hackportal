import { useEffect, useState } from 'react';
import { RequestHelper } from '../../lib/request-helper';
import { arrayFields, fieldToName, singleFields } from '../../lib/stats/field';
import { useAuthContext } from '../../lib/user/AuthContext';
import { UserData } from '../../pages/api/users';
import ErrorList from '../ErrorList';
import LoadIcon from '../LoadIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface UserAdminViewProps {
  goBack: () => void;
  currentUserId: string;
  updateCurrentUser: (value: Registration) => void;
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
  const [edit, setEdit] = useState(false);

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
      setEdit(false);
      setNewRole('');
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
            permissions: [newRole as UserPermission],
          },
        });
        setCurrentUser({
          ...currentUser,
          user: {
            ...currentUser.user,
            permissions: [newRole],
          },
        });
        setEdit(false);
        setNewRole('');
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
    <div className="">
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
        className="text-primaryDark font-bold flex items-center 2xl:text-xl md:text-lg text-base"
        onClick={() => {
          goBack();
        }}
      >
        <ChevronLeftIcon />
        Return to Users
      </button>
      <div className="w-full my-5">
        {/* User Info Card */}
        <div className="xl:w-3/5 md:w-4/5 w-full mx-auto border-[3px] border-complementary/[.1] lg:py-16 sm:py-12 py-8 lg:px-20 sm:px-16 px-10 rounded-xl text-complementary">
          <div className="border-b-2 pb-4 mb-5">
            <h1 className="font-semibold text-5xl">
              {currentUser.user.firstName + ' ' + currentUser.user.lastName}
            </h1>
          </div>
          <div className="md:text-xl text-lg mb-5 flex justify-between items-center">
            <div>
              <h1 className="font-semibold ">Role</h1>
              {!edit ? (
                <h1 className="">{currentUser.user.permissions[0]}</h1>
              ) : (
                <select
                  value={newRole}
                  onChange={(e) => {
                    setNewRole(e.target.value);
                  }}
                  name="new_role"
                  className="border-2 rounded-md focus:border-primaryDark pl-1 py-1"
                >
                  <option value="" disabled>
                    Choose a role
                  </option>
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                  <option value="hacker">Hacker</option>
                </select>
              )}
            </div>
            <button
              onClick={() => {
                newRole == '' ? setEdit(true) : updateRole();
              }}
              className="h-min py-1 px-6 2xl:text-lg text-base bg-secondary rounded-full text-primaryDark hover:bg-primaryDark hover:text-secondary transition duration-300 ease-in-out"
            >
              {newRole == '' ? 'Edit' : 'Update'}
            </button>
          </div>
          {singleFields.map((field) => {
            if (!currentUser.hasOwnProperty(field)) return <></>;
            return (
              <div key={field} className="md:text-xl text-lg mb-5">
                <h1 className="font-semibold ">{fieldToName[field]}</h1>
                <h1 className="">{currentUser[field]}</h1>
              </div>
            );
          })}
          {arrayFields.map((field) => {
            if (!currentUser.hasOwnProperty(field) || currentUser[field].length === 0) return <></>;
            return (
              <div key={field} className="md:text-xl text-lg mb-5">
                <h1 className="font-semibold ">{fieldToName[field]}</h1>
                {currentUser[field].map((item: string) => (
                  <h1 key={item} className="">
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
