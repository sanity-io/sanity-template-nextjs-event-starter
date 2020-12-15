export default {
  name: 'speaker',
  type: 'document',
  title: 'Speaker',
  preview: {
    select: {
      title: 'name',
      subtitle: 'company',
      media: 'image'
    }
  },
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Biography'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug'
    },
    {
      name: 'title',
      type: 'string',
      title: 'Professional title'
    },
    {
      name: 'twitter',
      type: 'string',
      title: 'Twitter'
    },
    {
      name: 'github',
      type: 'string',
      title: 'Github'
    },
    {
      name: 'company',
      type: 'string',
      title: 'Company'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true
      }
    }
  ]
}
