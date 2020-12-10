import ms from 'ms';
import { NextApiRequest, NextApiResponse } from 'next';
import { getAllStages } from '@lib/cms-api';

// Number of seconds to cache the API response for
const EXPIRES_SECONDS = 5;

export default async function getStages(_: NextApiRequest, res: NextApiResponse) {
  try {
    const allStages = await getAllStages();

    // Set caching headers
    const expires = new Date(Date.now() + ms(`${EXPIRES_SECONDS}s`));
    res.setHeader('Expires', expires.toUTCString());
    res.setHeader(
      'Cache-Control',
      `s-maxage=${EXPIRES_SECONDS}, immutable, must-revalidate, stale-while-revalidate`
    );

    return res.status(200).json(allStages);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);

    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error'
      }
    });
  }
}
