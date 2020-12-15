/**
 * Copyright 2020 Vercel Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { GetStaticProps } from 'next';

import Page from '@components/page';
import Schedule from '@components/schedule';
import Layout from '@components/layout';
import Header from '@components/header';

import { getAllStages,usePreviewSubscription } from '@lib/cms-api';
import { Stage } from '@lib/types';
import { META_DESCRIPTION } from '@lib/constants';
import { getAllStagesQuery } from '@lib/queries';

type Props = {
  allStages: Stage[];
};

export default function SchedulePage({ allStages, preview }: Props) {
  const meta = {
    title: 'Schedule - Virtual Event Starter Kit',
    description: META_DESCRIPTION
  };

  const {data: allStagesData} = usePreviewSubscription(getAllStagesQuery, {
    params: {slug: allStages.slug},
    initialData: allStages,
    enabled: preview,
  })

  return (
    <Page meta={meta}>
      <Layout>
        <Header hero="Schedule" description={meta.description} />
        <Schedule allStages={allStagesData} />
      </Layout>
    </Page>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (preview: Boolean = false) => {
  const allStages = await getAllStages(preview);

  return {
    props: {
      preview: true,
      allStages
    },
    revalidate: 60
  };
};
