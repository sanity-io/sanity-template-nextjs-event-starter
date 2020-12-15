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
      title: 'Slug'
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
      of: [{ type: 'reference', to: [{ type: 'talk' }] }]
    }
  ]
}
