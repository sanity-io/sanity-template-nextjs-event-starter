export default {
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
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
      name: 'website',
      type: 'url',
      title: 'Website'
    },
    {
      name: 'callToAction',
      type: 'string',
      title: 'callToAction'
    },
    {
      name: 'callToActionLink',
      type: 'url',
      title: 'callToActionLink'
    },
    {
      name: 'discord',
      type: 'string',
      title: 'discord'
    },
    {
      name: 'youtubeSlug',
      type: 'string',
      title: 'youtubeSlug'
    },
    {
      name: 'tier',
      type: 'string',
      title: 'tier'
    },
    {
      name: 'links',
      type: 'array',
      title: 'Links',
      of: [
        {
          type: 'link',

        }
      ]
    },
    {
      name: 'cardImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
  ],
}
