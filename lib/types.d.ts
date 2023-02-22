/**
 * A type extender that gives an object type an ID.
 */
type WithId<T> = T & {
  id: string;
};

type SortableObject<T> = T & { id: string };

/**
 * A flag for the set of functionality that is enabled for an account.
 */
type UserPermission = 'admin' | 'sponsor' | 'organizer' | 'judge' | 'hacker' | 'super_admin';
type Companies = 'SF' | 'AA' | 'C1' | 'EB' | 'FB';
/**
 * Basic information needed for displays on the website.
 *
 * This person type can be used.
 */
type Person = {
  /**
   * The user's first name.
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
  dietary: string[];
  accomodations: string;
  github?: string;
  linkedin?: string;
  website?: string;
  resume?: string;
  companies: Companies[];
  //claims: []; //Array of Strings will be used to id any claims (lunch, merch, etc.) made by user
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
 * @param linkedin linkedin link corresponding to team member
 * @param github github link corresponding to team member
 * @param personalSite personal site link corresponding to team member
 * @param rank number determining which member gets displayed in higher order, lower rank means higher order(index of array)
 * @param fileName string that matches the file name(with extension) of the corresponding speaker image in firebase storage
 *
 */
type TeamMember = {
  name: string;
  description: string;
  linkedin: string;
  github: string;
  personalSite: string;
  rank: int;
  fileName: string;
};

/**
 *
 * Represent a keynote speaker in home page
 *
 * @param name name of the keynote speaker
 * @param description description of that keynote speaker'
 * @param fileName string that matches the file name(with extension) of the corresponding speaker image in firebase storage
 *
 */
type KeynoteSpeaker = {
  name: string;
  subtitle: string;
  description: string;
  fileName: string;
};

/**
 *
 * Represent a challenge in hackcenter
 *
 * @param title title of challenge
 * @param description description of that challenge. To add a linebreak, simply add \n into the string value where needed in firebase
 * @param prizes array of prizes starting from first and ending to last place prize, not required
 * @param organization name of organization that is sponsoring the challenge
 * @param rank number determining which challenge gets displayed in higher order, lower rank means higher order(index of array)
 */
type Challenge = {
  title: string;
  description: string;
  prizes?: string[];
  organization: string;
  rank: int;
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

/**
 *
 * Represent an event
 * @param title title of event
 * @param speakers speakers of event
 * @param type type of event (Tech talk, workshop, social, etc.)
 * @param tracks what track the event is on (super-admin defined) ex: "General Event", "Technical Event", "Skills Event"
 * @param startDate start date of event
 * @param startTimestamp start timestamp of event
 * @param endDate end date of event
 * @param endTimestamp end timestamp of event
 * @param Event event id number
 * @param location location/room of event
 * @param page page where more information can be found about event
 * @param description description about event
 *
 */

type ScheduleEvent = {
  title: string;
  speakers?: string[];
  type?: string;
  track: string;
  startDate: Date;
  startTimestamp?: any;
  endDate: Date;
  endTimestamp?: any;
  Event: number;
  location: string;
  page: string;
  description: string;
};

type Sponsor = {
  link: string;
  reference: string;
};

type GeneralStats = {
  superAdminCount: number;
  checkedInCount: number;
  hackerCount: number;
  adminCount: number;
  scans: Record<string, number>;
};

/**
 * Data object passed into the MobileDropdownMenu component
 * that contains the sections and subsections to display, as well
 * as the section to redirect to
 */
type SidebarSection = {
  /** Display name of the section */
  title: string;

  /** Path to redirect to (eg. '#Workshops') */
  href?: string;

  /** List of subsections that will appear when clicked */
  sections?: SidebarSubsection[];
};

/**
 * Subsection object for the MobileDropdownSection;
 * does NOT contain deeper nestings of sections
 */
type SidebarSubsection = {
  /** Display name of the section */
  title: string;

  /** Path to redirect to (eg. '#Workshops') */
  href?: string;
};

/**
 * Typescript module decleration for markdown files
 */
declare module '*.md' {
  const content: any;
  export default content;
}
