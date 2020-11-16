export type TicketGenerationState = 'default' | 'loading';

export function isMobileOrTablet() {
  // https://stackoverflow.com/a/8876069/114157
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  return viewportWidth < 1200;
}

export const startDate = 'Oct 27th 9am Pacific Time (GMT-7)';
export const legalUrl = 'https://www.vercel.com';
export const codeOfConductUrl = 'https://www.vercel.com';
export const guidelinesUrl = 'https://www.vercel.com';
export const confEmail = 'sales@vercel.com';
export const navigation = [
  {
    name: 'Stage A',
    route: '/stage/a'
  },
  {
    name: 'Stage C',
    route: '/stage/c'
  },
  {
    name: 'Stage M',
    route: '/stage/m'
  },
  {
    name: 'Stage E',
    route: '/stage/e'
  },
  {
    name: 'Schedule',
    route: '/schedule'
  },
  {
    name: 'Speakers',
    route: '/speakers'
  },
  {
    name: 'Expo',
    route: '/expo'
  },
  {
    name: 'Jobs',
    route: '/jobs'
  }
];
