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

 // Let's you access Sanity Studio on /studio on the main site
 const STUDIO_REWRITE = {
   source: '/studio/:path*',
   destination:
     process.env.NODE_ENV === 'development'
       ? 'http://localhost:3333/studio/:path*'
       : '/studio/index.html'
 };

module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
    imageSizes: [24, 64, 300]
  },
  rewrites: () => [STUDIO_REWRITE]
};
