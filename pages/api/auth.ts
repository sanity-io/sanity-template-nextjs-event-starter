import { NextApiRequest, NextApiResponse } from 'next';
import { COOKIE } from '@lib/constants';
import redis from '@lib/redis';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const id = req.cookies[COOKIE];
  if (!id) {
    return res.status(400).json({
      error: {
        code: 'missing_cookie',
        message: 'Missing cookie'
      }
    });
  }

  if (redis) {
    const ticketNumberString = await redis.hget(`id:${id}`, 'ticketNumber');

    if (!ticketNumberString) {
      return res.status(401).json({
        error: {
          code: 'not_registered',
          message: 'This user is not registered'
        }
      });
    }
  }

  return res.status(200).json({ loggedIn: true });
}
