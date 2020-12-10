export const SITE_URL = 'https://conference.vercel.app';
export const API_URL = 'https://api.nextjs.org/api';
export const CONF_OAUTH_CALLBACK_URL = 'https://api.nextjs.org';
export const TWITTER_USER_NAME = 'vercel';
export const BRAND_NAME = 'ACME';
export const SITE_NAME_MULTILINE = ['ACME', 'Conf'];
export const SITE_NAME = 'ACME Conf';
export const TICKET_IMAGE_URL = 'TODO';
export const EMAIL = 'contact@example.com';
export const DATE = 'January 1, 2021';
export const FULL_DATE = 'Jan 1st 9am Pacific Time (GMT-7)';
export const LEGAL = 'https://www.vercel.com';
export const CODE_OF_CONDUCT = 'https://www.vercel.com';
export const GUIDELINES = 'https://www.vercel.com';
export const NAVIGATION = [
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

export type TicketGenerationState = 'default' | 'loading';
