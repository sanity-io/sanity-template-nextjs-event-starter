import { NextApiRequest, NextApiResponse } from 'next';
import { ConfUser } from '@lib/types';

export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const { email, username } = req.body;

  /* Fetch the user to your DB with either email or username */
  const user: ConfUser = {
    id: 'V1StGXR8_Z5jdHi6B-myT',
    email: 'user@example.com',
    ticketNumber: 1234,
    name: 'User Name',
    username: 'username',
    createdAt: 1607532293
  };

  return res.status(200).json(user);
}
