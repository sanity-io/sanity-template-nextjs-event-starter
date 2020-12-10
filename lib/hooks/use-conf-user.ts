import useSWR, { ConfigInterface } from 'swr';
import Cookies from 'js-cookie';
import { COOKIE_NAME } from '@lib/constants';
import { ConfUser } from '@lib/types';

async function auth(email: string): Promise<ConfUser | undefined> {
  const res = await fetch(`${process.env.API_URL || ''}/api/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    if (res.status === 401) return;

    const err = new Error('Failed to auth') as any;
    err.res = res;
    throw err;
  }

  return res.json();
}

export default function useConfUser(opts?: ConfigInterface) {
  const { data, mutate } = useSWR<ConfUser | undefined | null>(
    `${process.env.API_URL || ''}/api/user`,
    async () => {
      const email = Cookies.get(COOKIE_NAME);
      if (email) {
        return await auth(email);
      }
      return null;
    },
    {
      ...opts,
      revalidateOnFocus: false
    }
  );

  return {
    confUser: data,
    updateConfUser: async (email: string) => {
      Cookies.set(COOKIE_NAME, email, { expires: 7 });
      await mutate();
    }
  };
}
