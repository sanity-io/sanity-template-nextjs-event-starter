export default {
  name: 'talk',
  type: 'document',
  title: 'Talk',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'start',
      type: 'datetime',
      title: 'Start'
    },
    {
      name: 'end',
      type: 'datetime',
      title: 'End'
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'speakers',
      type: 'array',
      title: 'Speakers',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'speaker'
            }
          ]
        }
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      start: 'start',
      end: 'end',
      firstSpeakerImage: 'speakers.0.image'
    },
    prepare: ({title, start, end, firstSpeakerImage}) => {
      return {
        title,
        media: firstSpeakerImage,
        subtitle: `${new Date(start).toLocaleTimeString()} – ${new Date(end).toLocaleTimeString()}`
      }
    }
  }
}
