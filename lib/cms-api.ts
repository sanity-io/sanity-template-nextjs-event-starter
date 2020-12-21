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
import {
  groq,
  createClient,
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook
} from 'next-sanity'
import {
  getAllJobsQuery,
  getAllSponsorsQuery,
  getAllStagesQuery,
  getAllSpeakersQuery
} from './queries'

const config = {
  /**
   * Find your project ID and dataset in `sanity.json` in your studio project.
   * These are considered “public”, but you can use environment variables
   * if you want differ between local dev and production.
   *
   * https://nextjs.org/docs/basic-features/environment-variables
   **/
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  useCdn: process.env.NODE_ENV === 'production'
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
}
export const sanityClient = createClient(config)

export const previewClient = createClient({
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

export const getClient = (usePreview?: Boolean) =>
  usePreview ? previewClient : sanityClient

export const urlFor = (source: String | Object) => createImageUrlBuilder(config).image(source)

export const usePreviewSubscription = createPreviewSubscriptionHook(config)


export async function getAllSpeakers(preview?: Boolean) {
  const data = await getClient(preview).fetch(getAllSpeakersQuery)
  return data
}

export async function getAllStages(preview?: Boolean) {
  const data = await getClient(preview).fetch(getAllStagesQuery)

  return data
}

export async function getAllSponsors(preview?: Boolean) {
  const data = await getClient(preview).fetch(getAllSponsorsQuery)

  return data
}

export async function getAllJobs(preview?: Boolean) {
  const data = await getClient(preview).fetch(getAllJobsQuery)

  return data
}
