import Redis from 'ioredis';
import crypto from 'crypto';

const redis =
  process.env.REDIS_PORT &&
  process.env.REDIS_URL &&
  process.env.REDIS_PASSWORD &&
  process.env.REDIS_EMAIL_TO_ID_SECRET
    ? new Redis({
        port: parseInt(process.env.REDIS_PORT || '', 10),
        host: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD
      })
    : undefined;

export function emailToId(email: string) {
  if (process.env.REDIS_EMAIL_TO_ID_SECRET) {
    const hmac = crypto.createHmac('sha1', process.env.REDIS_EMAIL_TO_ID_SECRET);
    hmac.update(email);
    const result = hmac.digest('hex');
    return result;
  } else {
    throw new Error('REDIS_EMAIL_TO_ID_SECRET is missing');
  }
}

export default redis;
