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

  const updateUser = (firebaseUser: firebase.User | null) => {
    if (firebaseUser === null) {
      // User is signed out
      // TODO(auth): Determine if we want to remove user data from device on sign out
      setUser(null);
      return;
    }
    const { displayName, email, photoURL, uid } = firebaseUser;
    setUser({
      id: uid,
      firstName: displayName,
      lastName: '',
      preferredEmail: email,
      photoUrl: photoURL,
      permissions: [], // TODO: Get permissions from database, likely slim down auth-specific features
    });
  };

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
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
      .then(({ credential, user }) => {
        if (user === null) {
          // Something really went wrong
          console.warn("The signed-in user is null? That doesn't seem right.");
          return;
        }
        updateUser(user);
      })
      .catch((error) => {
        console.error('Error when signing in', error);
        // TODO(auth): Handle error appropriately
      });
  };

  const isSignedIn = user !== null;

  const authContextValue: AuthContextState = {
    user,
    isSignedIn,
    signInWithGoogle,
    signOut,
  };

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider, useAuthContext };
