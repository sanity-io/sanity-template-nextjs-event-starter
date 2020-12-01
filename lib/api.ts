import { SiteClient, ApiException } from 'datocms-client';

const API_URL = 'https://graphql.datocms.com/';
const API_TOKEN = process.env.DATOCMS_API_TOKEN;
const datoCmsClient = new SiteClient(API_TOKEN);

async function fetchAPI(query: string, { variables }: { variables?: Record<string, any> } = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  });

  const json = await res.json();
  if (json.errors) {
    // eslint-disable-next-line no-console
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }

  return json.data;
}

export async function getAllSpeakers() {
  const data = await fetchAPI(`
    {
      allSpeakers(first: 100) {
        name
        bio
        title
        slug
        twitter
        github
        company
        talk {
          title
          description
        }
        image {
          url(imgixParams: {fm: jpg, fit: crop, w: 300, h: 400})
        }
        imageSquare: image {
          url(imgixParams: {fm: jpg, fit: crop, w: 192, h: 192})
        }
      }
    }
  `);

  return data.allSpeakers;
}

export async function getAllStages() {
  const data = await fetchAPI(`
    {
      allStages(first: 100, orderBy: order_ASC) {
        name
        slug
        stream
        discord
        schedule {
          title
          start
          end
          speaker {
            name
            slug
            image {
              url(imgixParams: {fm: jpg, fit: crop, w: 120, h: 120})
            }
          }
        }
      }
    }
  `);

  return data.allStages;
}

export async function getAllSponsors() {
  const data = await fetchAPI(`
    {
      allCompanies(first: 100, orderBy: tierRank_ASC) {
        name
        description
        slug
        website
        callToAction
        callToActionLink
        discord
        youtubeSlug
        tier
        links {
          url
          text
        }
        cardImage {
          url(imgixParams: {fm: jpg, fit: crop})
        }
        logo {
          url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100})
        }
      }
    }
  `);

  return data.allCompanies;
}

export async function getAllJobs() {
  const data = await fetchAPI(`
    {
      allJobs(first: 100, orderBy: rank_ASC) {
        id
        companyName
        title
        description
        discord
        link
        rank
      }
    }
  `);

  return data.allJobs;
}

/**
 * Updates the `nextTicketNumber` counter using optimistic-locking.
 * @see https://www.datocms.com/docs/content-management-api/resources/item/update
 */
async function getNextTicketNumberAndIncrement(): Promise<number> {
  const config = await datoCmsClient.items.all({
    filter: {
      type: 'config'
    }
  })[0];

  if (!config || !config.nextTicketNumber) {
    throw new Error('Failed to fetch config');
  }

  try {
    await datoCmsClient.items.update(config.id, {
      nextTicketNumber: config.nextTicketNumber + 1,
      meta: { currentVersion: config.meta.currentVersion }
    });
    return config.nextTicketNumber;
  } catch (e) {
    if (e instanceof ApiException && e.errorWithCode('STALE_ITEM_VERSION')) {
      return await getNextTicketNumberAndIncrement();
    }
    throw e;
  }
}

export async function createUser(email: string) {
  // TODO: Check race conditions and verify that this ticketNumber would be unique
  const ticketNumber = await getNextTicketNumberAndIncrement();
  await datoCmsClient.items.create({
    itemType: 'user',
    email,
    ticketNumber
  });
}
