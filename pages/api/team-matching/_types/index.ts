export const TEAM_MATCHING_POSTINGS_COLLECTION = '/team-matching-postings';
export const TEAM_MATCHING_INTERESTS_COLLECTION = '/team-matching-interests';
export const TEAM_MATCHING_PROFILES_COLLECTION = '/team-matching-profiles';

export type TeamMatchingPosting = {
  ownerUserId: string;
  interestIds: string[];
  numberOfPeople: number;
  skillset: string[];
};

export enum TeamMatchingInterestStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
  waiting_confirmation = 'waiting confirmation',
}

export type TeamMatchingInterest = {
  postingId: string;
  teamMatchingProfileId: string;
  status: TeamMatchingInterestStatus;
};

export type TeamMatchingProfile = {
  userId: string;
  skillset: string[];
  name: string;
  projects: {
    description: string;
    github: string;
  }[];
  email: string;
  alreadyInTeam: boolean;
};
