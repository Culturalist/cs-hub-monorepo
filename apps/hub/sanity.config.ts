/* eslint import/no-unresolved: 0 */
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {languageFilter} from '@sanity/language-filter'
import {colorInput} from '@sanity/color-input'
import {table} from '@sanity/table'
import {vercelDeployTool} from 'sanity-plugin-vercel-deploy'
import {DocumentAny, appsConfig, capitalize, globalConfig, languageFilterConfig} from '@cs/globals'
import {deskStructure, initialValueTemplates, schemaTypes} from '@cs/data'
import {StudioLogo} from '@cs/ui/components/studio'

const websites = {
  culturas: {
    title: 'Cultura-säätiö',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID_CULTURAS || '',
  },
  instituutiot: {
    title: 'Instituutiot',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID_INSTITUUTIT || '',
  },
  venajankieliset: {
    title: 'Venajankieliset',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID_VENAJANKIELISET || '',
  },
  juhlarahasto: {
    title: 'Juhlarahasto',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID_JUHLARAHASTO || '',
  },
  culturaweek: {
    title: 'CulturaWeek',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID_CULTURAWEEK || '',
  },
  tieto: {
    title: 'Tieto',
    projectId: process.env.SANITY_STUDIO_PROJECT_ID_TIETO || '',
  },
}

export default defineConfig(
  Object.entries(websites).map(([appName, {title, projectId}]) => ({
    name: appName,
    title,
    projectId,
    dataset: 'production',
    basePath: `/${appName}`,
    apiVersion: globalConfig.latestUpdate,
    icon: StudioLogo[appName],
    plugins: [
      structureTool(deskStructure(appName)),
      languageFilter(languageFilterConfig()),
      colorInput(),
      table(),
      vercelDeployTool(),
    ],
    schema: {
      types: schemaTypes(),
      templates: initialValueTemplates,
    },
    document: {
      actions: (prev, {schemaType}) => {
        if (!appsConfig[appName].schemas.create.includes(schemaType as DocumentAny)) {
          return prev.filter(
            (prevAction) =>
              prevAction.action !== 'unpublish' &&
              prevAction.action !== 'delete' &&
              prevAction.action !== 'duplicate',
          )
        }
        return prev
      },
      newDocumentOptions: () => {
        return appsConfig[appName].schemas.create.map((docType) => ({
          title: capitalize(docType),
          templateId: `${docType}-with-initial`,
          type: 'initialValueTemplateItem',
        }))
      },
    },
  })),
)
