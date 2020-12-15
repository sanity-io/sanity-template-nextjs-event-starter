export default {
  name: 'job',
  title: 'Job',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'company',
      title: 'Company',
      type: 'reference',
      to: [
        {
          type: 'company'
        }
      ]
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
    {
      name: 'discord',
      title: 'Discord',
      type: 'string',
    },
    {
      name: 'rank',
      title: 'Rank',
      type: 'string',
    },
  ],
}
