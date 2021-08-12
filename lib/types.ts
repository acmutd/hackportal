/**
 * A type extender that gives an object type an ID.
 */
export type WithId<T> = T & {
  id: string;
};

/**
 * A flag for the set of functionality that is enabled for an account.
 */
export type UserPermission = 'admin' | 'sponsor' | 'organizer' | 'judge' | 'hacker';

/**
 * Basic information needed for displays on the website.
 *
 * This person type can be used.
 */
type Person = {
  /**
   * The uesr's first name.
   */
  firstName: string;

  /**
   * The user's last name.
   */
  lastName: string;

  /**
   * The user's contact email.
   */
  preferredEmail: string;

  /**
   * The user's profile image.
   */
  photoUrl?: string;
};

/**
 * Information for a user account.
 */
export type User = Person & {
  /**
   * The unique identifier for this user.
   */
  id: string;

  /**
   * Flags for parts of the app this user can access.
   */
  permissions: UserPermission[];
};
