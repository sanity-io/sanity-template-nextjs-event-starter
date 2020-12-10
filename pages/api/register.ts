import { NextApiRequest, NextApiResponse } from 'next';
import { ConfUser } from '@lib/types';

export default async function register(req: NextApiRequest, res: NextApiResponse<ConfUser>) {
  const { email } = req.body;

  /* Write code here to save the user to your DB */
  const user: ConfUser = {
    id: 'V1StGXR8_Z5jdHi6B-myT',
    email,
    ticketNumber: 1234,
    createdAt: 1607532293
  };

  return res.status(201).json(user);
}
