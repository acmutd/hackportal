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
   * User's JWT.
   */
  token?: string;

  /**
   * Flags for parts of the app this user can access.
   */
  permissions: UserPermission[];

  /**
   * University that user currently attends
   *
   */
  university: string;
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

  university: string;
  major: string;
  studyLevel: string;

  //claims: []; //Array of Strings will be used to id any claims (lunch, merch, etc.) made by user
  scans?: string[];
};

/**
 * Represent an answered question
 *
 * @param question a question
 * @param answer answer to corresponding question
 *
 *  */
type AnsweredQuestion = {
  question: string;
  answer: string;
};

/**
 * Represent a waiting-for-response question
 *
 * @param question a question
 *
 *  */
type PendingQuestion = {
  question: string;
};

/**
 *
 * Represent a team member in "Meet our Team" section of /about
 *
 * @param name name of the team member
 * @param description description of that team member
 *
 */
type TeamMember = {
  name: string;
  description: string;
};

/**
 *
 * Represent a color scheme consist of a light and dark version used by a component
 *
 * @param light color code of the light variant
 * @param dark color code of the dark variant
 */
type ColorScheme = {
  light: string;
  dark: string;
};

type Announcement = {
  announcement: string;
  timestamp?: string;
};
