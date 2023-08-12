import { hackPortalConfig } from '../../hackportal.config';

export function computeHash(userId: string): number {
  const p = 61,
    m = 1000000009;
  let ans = 0,
    curr = 1;
  for (let c of userId) {
    ans = (ans + ((c.charCodeAt(0) * curr) % m)) % m;
    curr = (curr * p) % m;
  }
  return ans;
}

export function determineColorByTeamIdx(userHashValue: number) {
  return hackPortalConfig.groupNames[userHashValue % hackPortalConfig.groupNames.length];
}
