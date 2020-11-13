import useSWR, { ConfigInterface } from 'swr';
import Cookies from 'js-cookie';
import { API_URL } from '@lib/constants';

const URL = `${API_URL}/conf-auth`;

export interface ConfUser {
  id: string;
  email: string;
  ticketNumber: number;
  name: string;
  username: string;
  createdAt: number;
}

async function auth(email: string): Promise<ConfUser | undefined> {
  const res = await fetch(URL, {
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
    URL,
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
