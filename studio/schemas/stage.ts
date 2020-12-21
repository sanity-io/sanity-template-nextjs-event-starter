import client from 'part:@sanity/base/client'

export default {
  name: 'stage',
  type: 'document',
  title: 'Stage',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name'
      }
    },
    {
      name: 'stream',
      type: 'string',
      title: 'Stream'
    },
    {
      name: 'discord',
      type: 'string',
      title: 'Discord'
    },
    {
      name: 'schedule',
      type: 'array',
      title: 'Schedule',
      of: [
        {
          type: 'reference',
          to: [{ type: 'talk' }],
          validation: Rule =>
            Rule.warning().custom((talk, context) => {
              if (typeof talk._ref === 'undefined') {
                return true
              }
              // Check if the given talk is already on another stage’s schedule
              return client
                .fetch(
                  `//groq
                    *[_id != $id && $ref in schedule[]._ref].name`,
                  {
                    ref: talk._ref,
                    id: context.document._id
                  }
                )
                .then(schedules => {
                  if (schedules.length > 0) {
                    return `This talk is already on another schedule: ${[...new Set(schedules)].join(
                      ', '
                    )}`
                  }
                  return true
                })
            })
        }
      ],
      validation: Rule => Rule.unique().warning(`This talk is already in this schedule`)
    }
  ],
  preview: {
    select: {
      name: 'name',
      schedule: 'schedule'
    },
    prepare: ({ name = '', schedule = [] }) => {
      return {
        title: name,
        subtitle: `${schedule.length} talk${schedule.length !== 1 ? 's' : ''}`
      }
    }
  }
}
