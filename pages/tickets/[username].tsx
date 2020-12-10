import { GetStaticProps, GetStaticPaths } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { SkipNavContent } from '@reach/skip-nav';

import Page from '@components/page';
import ConfContent from '@components/index';
import { SITE_URL, TICKET_IMAGE_URL, SITE_NAME } from '@lib/constants';

type Props = {
  username: string | null;
  name: string | null;
  ticketNumber: number | null;
};

export default function TicketShare({ username, ticketNumber, name }: Props) {
  if (!username || !ticketNumber) {
    return <Error statusCode={404} />;
  }

  const meta = {
    title: `${name}’s ${SITE_NAME} Ticket`,
    description: `Join ${name} at ${SITE_NAME}. An interactive online experience by the community, free for everyone.`,
    image: username
      ? `${TICKET_IMAGE_URL}/Nextjs-Conf-Ticket.png?username=${username}`
      : '/twitter-card.png',
    url: `${SITE_URL}/tickets/${username}`
  };

  return (
    <Page meta={meta}>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <SkipNavContent />
      <ConfContent
        defaultUserData={{
          username,
          name: name || '',
          ticketNumber
        }}
        sharePage
      />
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const username = params?.username?.toString() || null;

  if (username) {
    const res = await fetch(`${process.env.API_URL || ''}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: params?.username?.toString()
      })
    });

    if (res.ok) {
      const { name, ticketNumber } = await res.json();
      return {
        props: {
          username: username || null,
          name: name || username || null,
          ticketNumber: ticketNumber || null
        },
        revalidate: 5
      };
    }
  }

  return {
    props: {
      username: null,
      name: null,
      ticketNumber: null
    },
    revalidate: 5
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return Promise.resolve({
    paths: [],
    fallback: 'blocking'
  });
};
