import {table} from '@sanity/table'
import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'lumore',

  projectId: 'rbpc2sfo',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), table()],

  schema: {
    types: schemaTypes,
    templates: (prev) => {
      const categoryChild = {
        id: 'category-child',
        title: 'Category: Child',
        schemaType: 'category',
        parameters: [{name: `parentId`, title: `Parent ID`, type: `string`}],
        // This value will be passed-in from desk structure
        value: ({parentId}: {parentId: string}) => ({
          parent: {_type: 'reference', _ref: parentId},
        }),
      }

      return [...prev, categoryChild]
    },
  },
})
