import { groq } from 'next-sanity'

export const getAllSpeakersQuery = groq`*[_type == "speaker"]{
        name,
        bio,
        title,
        "slug": slug.current,
        twitter,
        github,
        company,
        "talk": *[_type == "talk" && ^._id in speakers[]._ref]{
          title,
          description
        },
        image
      }`

export const getAllStagesQuery = groq`*[_type == "stage"]{
        name,
        "slug": slug.current,
        stream,
        discord,
        schedule[]->{
          title,
          start,
          end,
          speaker[]->{
            name,
            "slug": slug.current,
            image
          }
        }
      }`

export const getAllSponsorsQuery = groq`*[_type == "company"]{
        name,
        description,
        "slug": slug.current,
        website,
        callToAction,
        callToActionLink,
        discord,
        youtubeSlug,
        tier,
        links[]{
          url,
          text
        },
        cardImage ,
        logo
      }|order(rank desc)`

export const getAllJobsQuery = groq`*[_type == "job"]{
      _id,
      "companyName": company->name,
      title,
      description,
      discord,
      link,
      rank
    }|order(rank desc)|[0...100]`
