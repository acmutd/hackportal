import { useAuthContext } from '../user/AuthContext';

/**
 * A hook to get user profile data.
 */
export function useUser() {
  const { user: authUser } = useAuthContext();

  return {
    ...authUser,
  };
}
