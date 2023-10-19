import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

/**
 * Utility attributes and functions used to handle user auth state within an AuthContext.
 */
interface AuthContextState {
  /**
   * The current user. If no user is signed in, the user is anonymous.
   */
  user: User;

  /**
   * Returns whether a user is currently signed in to the Service.
   */
  isSignedIn: boolean;

  /**
   * Signs in using Google OAuth pop-up.
   */
  signInWithGoogle: () => void;

  /**
   * Signs out of the current user session if active.
   */
  signOut: () => Promise<void>;

  /**
   * Check if a user already has a profile
   */
  hasProfile: boolean;

  profile: Registration;

  updateProfile: (newProfile: Registration) => void;

  /**
   * Updates user after logging in using password
   */
  updateUser: (user) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextState | undefined>(undefined); // Find a better solution for this

/**
 * A React hook that exposes user authentication information and functions.
 *
 * Any hooks that explicitly or implicitly rely on user identity must be within
 * an AuthProvider.
 */
function useAuthContext(): AuthContextState {
  const context = React.useContext(AuthContext);
  if (context == null) {
    throw new Error('useAuthState must be used in an AuthProvider');
  }
  return context;
}

/**
 * @return An AuthContext provider that handles authentication.
 */
function AuthProvider({ children }: React.PropsWithChildren<Record<string, any>>): JSX.Element {
  const [user, setUser] = React.useState<User>(null);
  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState(null);

  const updateProfile = (profile: Registration) => {
    setProfile(profile);
  };

  const updateUser = async (firebaseUser: firebase.User | null) => {
    setLoading(true);
    if (firebaseUser === null) {
      // User is signed out
      // TODO(auth): Determine if we want to remove user data from device on sign out
      setUser(null);
      setLoading(false);
      return;
    }

    const { displayName, email, photoURL, uid } = firebaseUser;

    const token = await firebaseUser.getIdToken();
    setUser({
      id: uid,
      token,
      firstName: displayName,
      lastName: '',
      preferredEmail: email,
      photoUrl: photoURL,
      permissions: ['hacker'],
      university: '',
      points: 0,
    });
    const query = new URL(`http://localhost:3000/api/userinfo`);
    query.searchParams.append('id', uid);
    const data = await fetch(query.toString().replaceAll('http://localhost:3000', ''), {
      mode: 'cors',
      headers: { Authorization: token },
      method: 'GET',
    });
    if (data.status !== 200) {
      console.error('Unexpected error when fetching AuthContext permission data...');
      setLoading(false);
      return;
    }
    const userData = await data.json();
    let permissions: UserPermission[] = userData.user?.permissions || ['hacker'];
    setUser((prev) => ({
      ...prev,
      firstName: userData.user.firstName,
      lastName: userData.user.lastName,
      preferredEmail: userData.user.preferredEmail,
      permissions,
      university: userData.university,
      points: userData.user.points,
    }));
    setProfile(userData);
    setLoading(false);
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null && !user.emailVerified) return;
      updateUser(user);
    });
  }, []);

  /**
   * Signs out the currently signed-in user.
   *
   * This switches to the guest user.
   */
  async function signOut() {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.error('Could not sign out.', error);
      });
  }

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(async ({ credential, user }) => {
        if (user === null) {
          // Something really went wrong
          console.warn("The signed-in user is null? That doesn't seem right.");
          return;
        }
        await updateUser(user);
      })
      .catch((error) => {
        console.error('Error when signing in', error);
        // TODO(auth): Handle error appropriately
      });
  };

  const isSignedIn = user !== null;
  const hasProfile = profile !== null;

  const authContextValue: AuthContextState = {
    user,
    isSignedIn,
    signInWithGoogle,
    signOut,
    hasProfile,
    profile,
    updateProfile,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>{!loading && children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider, useAuthContext };
