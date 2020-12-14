import useSWR, { ConfigInterface } from 'swr';

export default function useLoginStatus(opts?: ConfigInterface) {
  const { data, error, mutate } = useSWR(
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
    loginStatus: error
      ? ('loggedOut' as const)
      : !data
      ? ('loading' as const)
      : ('loggedIn' as const),
    mutate
  };
}
