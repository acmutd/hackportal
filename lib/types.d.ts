/**
 * A type extender that gives an object type an ID.
 */
type WithId<T> = T & {
  id: string;
};

/**
 * A flag for the set of functionality that is enabled for an account.
 */
type UserPermission = 'admin' | 'sponsor' | 'organizer' | 'judge' | 'hacker';

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
type User = Person & {
  /**
   * The unique identifier for this user.
   */
  id: string;

  /**
   * Flags for parts of the app this user can access.
   */
  permissions: UserPermission[];
};

/**
 * Information about a specific event registration.
 */
type Registration = {
  /**
   * The email used to contact the user.
   */
  preferredEmail: string;

  /**
   * Basic biographical user data
   */
  user: User;
  /**
   * A UNIX timestamp corresponding to when a hacker registered for the event.
   */
  timestamp: number;
  // TODO: Allow for qualifiers like "how old will you be at the day of the event?"
  age: number;

  gender: string;

  ethnicity: string;

  // TODO: Allow this to be dynamically defined by the organizers
  // TODO: responses: { [questionId: string]: Question }
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  resumeUrl?: string;
};
