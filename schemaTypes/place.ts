import {defineField, defineType} from 'sanity'
import {MapPinIcon} from 'lucide-react'

const requiredText = (label: string) =>
  defineField({
    name: label,
    type: 'string',
    validation: (rule) => rule.required(),
  })

const ctaField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({
        name: 'label',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
      defineField({
        name: 'href',
        type: 'string',
        validation: (rule) => rule.required(),
      }),
    ],
    validation: (rule) => rule.required(),
  })

export const placeType = defineType({
  name: 'place',
  title: 'Place',
  type: 'document',
  icon: MapPinIcon,
  fields: [
    defineField({
      name: 'placeName',
      title: 'Place Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'region',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'placeName'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (rule) => rule.integer().min(0),
    }),
    defineField({
      name: 'seo',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'title',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'description',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'canonical',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'hero',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'headline',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'subheadline',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        ctaField('secondaryCta', 'Secondary CTA'),
        defineField({
          name: 'heroImages',
          title: 'Hero Images',
          type: 'array',
          validation: (rule) => rule.required().min(1),
          of: [
            defineField({
              name: 'image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'areas',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        requiredText('title'),
        defineField({
          name: 'items',
          type: 'array',
          of: [
            defineField({
              name: 'area',
              type: 'object',
              fields: [
                defineField({
                  name: 'name',
                  type: 'string',
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'description',
                  type: 'text',
                  rows: 3,
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: 'dateIdeas',
                  type: 'array',
                  of: [{type: 'string'}],
                }),
              ],
              preview: {
                select: {
                  title: 'name',
                },
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'events',
      type: 'object',
      validation: (rule) => rule.required(),
      fields: [
        requiredText('title'),
        defineField({
          name: 'intro',
          type: 'text',
          rows: 3,
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'types',
          type: 'array',
          of: [{type: 'string'}],
        }),
        ctaField('cta', 'Events CTA'),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'placeName',
      region: 'region',
      country: 'country',
    },
    prepare: ({title, region, country}) => ({
      title,
      subtitle: [region, country].filter(Boolean).join(', '),
    }),
  },
})
