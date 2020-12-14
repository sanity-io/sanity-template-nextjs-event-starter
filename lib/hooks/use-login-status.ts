import useSWR, { ConfigInterface } from 'swr';
import { ConfUser } from '@lib/types';

export default function useLoginStatus(opts?: ConfigInterface) {
  const { error, mutate } = useSWR<ConfUser | undefined | null>(
    `/api/auth`,
    async url => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    },
    {
      ...opts,
      revalidateOnFocus: false
    }
  );

  return {
    loggedIn: !error,
    mutate
  };
}
