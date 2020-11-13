import cn from 'classnames';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { SITE_NAME, SITE_URL, TWITTER_USER_NAME } from '@lib/constants';
import GlobalStyles from './global-styles';

type Meta = {
  title: string | null;
  description: string | null;
  image?: string | null;
  url?: string | null;
};

type Props = {
  meta: Meta;
  children: React.ReactNode;
  fullViewport: boolean;
};

export default function Page({ meta, children, fullViewport = false }: Props) {
  const router = useRouter();
  const image = meta.image || '/twitter-card.png';
  const title = `${meta.title} – ${SITE_NAME}`;
  const url = meta.url || `${SITE_URL}${router.asPath}`;
  const description = meta.description || SITE_NAME;

  return (
    <div className={cn('page-container', { full: fullViewport })}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:site" content={`@${TWITTER_USER_NAME}`} />
        <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
        {image && (
          <meta
            property="og:image"
            content={image.startsWith('https://') ? image : `${SITE_URL}${image}`}
          />
        )}
      </Head>
      {children}
      <GlobalStyles />
    </div>
  );
}
