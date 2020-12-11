const API_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`;
const API_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

async function fetchCmsAPI(query: string) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`
    },
    body: JSON.stringify({
      query
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
  const data = await fetchCmsAPI(`
    {
      speakerCollection {
        items {
          name
          bio
          title
          slug
          twitter
          github
          company
          talk {
            ... on Talk {
              title
              description
            }
          }
          image {
            url
          }
          imageSquare: image {
            url
          }
        }
      }
    }
  `);

  return data.speakerCollection.items;
}

export async function getAllStages() {
  const data = await fetchCmsAPI(`
    {
      stageCollection {
        items {
            name
            slug
            stream
            discord
            scheduleCollection(limit: 0) {
              items {
                ... on Talk {
                  title
                  start
                  end
                  speakerCollection(limit: 5) {
                    items {
                      ... on Speaker {
                      name
                      slug
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  return data.stageCollection.items;
}

export async function getAllSponsors() {
  const data = await fetchCmsAPI(`
    {
      companyCollection(order: tierRank_ASC, limit: 100) {
        items {
            sys {
              id
            }
            name
            description
            slug
            website
            callToAction
            callToActionLink
            discord
            youtubeSlug
            tier
            links 
            cardImage {
              url
            }
            logo {
              url
            }
        }
      }
    }
  `);

  return data.companyCollection.items;
}

export async function getAllJobs() {
  const data = await fetchCmsAPI(`
    {
      jobCollection(order: rank_ASC, limit: 100) {
        items {
            sys {
              id
            }
            companyName
            title
            description
            discord
            link
            rank
        }
      }
    }
  `);

  return data.jobCollection.items;
}
