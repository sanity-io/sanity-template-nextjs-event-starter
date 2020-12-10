import useSWR, { ConfigInterface } from 'swr';
import Cookies from 'js-cookie';
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

export function useConfUser(opts?: ConfigInterface) {
  return useSWR<ConfUser | undefined | null, any>(
    `${process.env.API_URL || ''}/api/user`,
    () => {
      const email = Cookies.get('conf-email');
      if (email) {
        return auth(email);
      }
      return null;
    },
    {
      ...opts,
      revalidateOnFocus: false
    }
  );
}
