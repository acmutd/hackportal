export const buttonDatas = [
  { text: 'Hacker App', path: '/' },
  { text: 'Mentor App', path: '/' },
  { text: 'Sponsor App', path: '/' },
];

export const navItems = [
  { text: 'Home', path: '/' },
  { text: 'Dashboard', path: '/dashboard' },
  { text: 'Schedule', path: '/schedule' },
  { text: 'HackerPack', path: '/hackerpacks' },
];

export const stats = [
  {
    data: '100+ Hackers',
    object: '',
  },
  {
    data: '$2,500 in Prizes',
    object: '',
  },
  {
    data: '50+ Projects',
    object: '',
  },
];

export const DEFAULT_EVENT_FORM_DATA: ScheduleEvent = {
  description: '',
  title: '',
  page: '',
  type: '',
  track: '',
  location: '',
  speakers: [],
  startDate: new Date(),
  endDate: new Date(),
  Event: -1,
};
