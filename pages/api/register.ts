import { NextApiRequest, NextApiResponse } from 'next';
import { ConfUser } from '@lib/types';
import validator from 'validator';
import { SAMPLE_TICKET_NUMBER } from '@lib/constants';
import redis, { emailToId } from '@lib/redis';

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<ConfUser | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  const email: string = ((req.body.email as string) || '').trim().toLowerCase();
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      error: {
        code: 'bad_email',
        message: 'Invalid email'
      }
    });
  }

  let id: string | undefined = undefined;
  let ticketNumber: number;
  let createdAt: number;
  let statusCode: number;
  let name: string | undefined = undefined;
  let username: string | undefined = undefined;
  if (redis) {
    id = emailToId(email);
    const existingTicketNumberString = await redis.hget(`id:${id}`, 'ticketNumber');

    if (existingTicketNumberString) {
      const item = await redis.hmget(`id:${id}`, 'name', 'username', 'createdAt');
      name = item[0]!;
      username = item[1]!;
      ticketNumber = parseInt(existingTicketNumberString, 10);
      createdAt = parseInt(item[2]!, 10);
      statusCode = 200;
    } else {
      ticketNumber = await redis.incr('count');
      createdAt = Date.now();
      await redis.hmset(
        `id:${id}`,
        'email',
        email,
        'ticketNumber',
        ticketNumber,
        'createdAt',
        createdAt
      );
      statusCode = 201;
    }
  } else {
    ticketNumber = SAMPLE_TICKET_NUMBER;
    createdAt = Date.now();
    statusCode = 200;
  }

  return res.status(statusCode).json({
    id,
    email,
    ticketNumber,
    createdAt,
    name,
    username
  });
}
