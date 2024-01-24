import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {initialValueTemplates, schemaTypes} from '@cs/data'
import {languageFilter} from '@sanity/language-filter'
import {colorInput} from '@sanity/color-input'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {languageFilterConfig} from '@cs/globals'

const projectIds = {
  culturas: process.env.SANITY_STUDIO_PROJECT_ID_CULTURAS || '',
  culturaweek: process.env.SANITY_STUDIO_PROJECT_ID_CULTURAWEEK || '',
  instituutiot: process.env.SANITY_STUDIO_PROJECT_ID_INSTITUUTIT || '',
  juhlarahasto: process.env.SANITY_STUDIO_PROJECT_ID_JUHLARAHASTO || '',
  venajankieliset: process.env.SANITY_STUDIO_PROJECT_ID_VENAJANKIELISET || '',
}

export default defineConfig([
  {
    name: 'culturas',
    title: 'Cultura-säätiö',

    projectId: projectIds.culturas,
    dataset: 'production',
    basePath: '/culturas',

    plugins: [
      deskTool(),
      languageFilter(languageFilterConfig()),
      colorInput(),
      vercelDeployTool(),
      visionTool(),
    ],

    schema: {
      types: schemaTypes(),
      templates: initialValueTemplates,
    },
  },
  {
    name: 'culturaweek',
    title: 'CulturaWeek',

    projectId: projectIds.culturaweek,
    dataset: 'production',
    basePath: '/culturaweek',

    plugins: [
      deskTool(),
      languageFilter(languageFilterConfig()),
      colorInput(),
      vercelDeployTool(),
      visionTool(),
    ],

    schema: {
      types: schemaTypes(),
      templates: initialValueTemplates,
    },
  },
])

// export default defineConfig({
//   name: appName,
//   title: appConfig.title,
//   basePath: '/admin',
//   projectId,
//   dataset: 'production',
//   apiVersion: globalConfig.latestUpdate,

//   plugins: [
//     deskTool(deskStructure()),
//     languageFilter(languageFilterConfig()),
//     colorInput(),
//     vercelDeployTool(),
//   ],
//   schema: {
//     types: schemaTypes(),
//     templates: initialValueTemplates,
//   },
//   studio: {
//     components: {
//       logo: StudioLogo,
//     },
//   },
//   document: {
//     actions: (prev, {schemaType}) => {
//       if (!appConfig.schemas.create.includes(schemaType as DocumentAny)) {
//         return prev.filter(
//           (prevAction) =>
//             prevAction.action !== 'unpublish' &&
//             prevAction.action !== 'delete' &&
//             prevAction.action !== 'duplicate',
//         )
//       }
//       return prev
//     },
//     newDocumentOptions: () => {
//       return appConfig.schemas.create.map((docType) => ({
//         title: capitalize(docType),
//         templateId: `${docType}-with-initial`,
//         type: 'initialValueTemplateItem',
//       }))
//     },
//   },
// })
