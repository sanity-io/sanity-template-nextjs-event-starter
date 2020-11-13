import { GetStaticProps } from 'next';

import Page from '@components/page';
import Schedule from '@components/schedule';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllStages } from '@lib/api';
import { Stage } from '@lib/types';
import { startDate } from '@lib/conf';

type Props = {
  allStages: Stage[];
};

export default function SchedulePage({ allStages }: Props) {
  const meta = {title: "Schedule", description: `Keynote begins ${startDate}. Local times shown below.` }

  return (
    <Page meta={meta}>
      <Layout>
        <Header
          hero={meta.title}
          description={meta.description}
        />
        <Schedule allStages={allStages} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allStages = await getAllStages();

  return {
    props: {
      allStages
    },
    revalidate: 60
  };
};
