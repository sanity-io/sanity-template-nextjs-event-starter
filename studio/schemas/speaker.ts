export default {
  name: 'speaker',
  type: 'document',
  title: 'Speaker',
  preview: {
    select: {
      title: 'name',
      company: 'company.name',
      professionalTitle: 'title',
      media: 'image'
    },
    prepare: ({title, company = '', professionalTitle = '', media}) => {
      return {
        title,
        media,
        subtitle: `${professionalTitle} @ ${company}`
      }
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
      title: 'Slug',
      options: {
        source: 'name'
      }
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
      type: 'reference',
      title: 'Company',
      to: [{
        type: 'company'
      }]
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
