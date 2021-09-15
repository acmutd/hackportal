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
type Companies = 'SF' | 'AA' | 'C1' | 'EB' | 'FB';
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
  id: string;
  /**
   * A UNIX timestamp corresponding to when a hacker registered for the event.
   */
  timestamp: number;
  /**
   * Basic biographical user data
   */
  user: {
    id: string;
    permissions: UserPermission[];
    firstName: string;
    lastName: string;
    /**
     * The email used to contact the user.
     */
    preferredEmail: string;
  };
  // TODO: Allow for qualifiers like "how old will you be at the day of the event?"
  // TODO: Allow this to be dynamically defined by the organizers
  // TODO: responses: { [questionId: string]: Question }
  age: number;
  gender: string;
  race: string;
  ethnicity: string;
  university: string;
  major: string;
  studyLevel: string;
  hackathonExperience: number;
  softwareExperience: string;
  heardFrom: string;
  size: string;
  dietary: Array<string>; // proposed change
  accomodations: string;
  github?: string;
  linkedin?: string;
  website?: string;
  resume?: string;
  companies: Companies[];
};
