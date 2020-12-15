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
      name: 'speaker',
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
  ]
}
