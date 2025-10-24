import {defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title of the blog...',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'string',
      title: 'excerpt a short description of the blog...',
    }),
    defineField({
      name: 'summary',
      type: 'string',
      title: 'Summary of the blog...',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}, {type: 'table'}],
    }),
    defineField({
      name: 'category',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}], options: {filter: 'defined(parent)'}}],
    }),
  ],
})
