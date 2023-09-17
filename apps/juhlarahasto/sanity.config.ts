import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { ToolMenuApp } from 'ui';
import deskStructure from './studio/deskStructure';
import StudioLogo from './studio/StudioLogo';
import globalConfig from 'globals/globalConfig';
import { DocumentAny, initialValueTemplates, schemaTypes } from 'data/schemas';
import { languageFilter } from '@sanity/language-filter';
import { languageFilterConfig } from 'globals/lib/language-filter';
import { colorInput } from '@sanity/color-input';
import app from './app.json';
import { capitalize } from 'globals/utils';

const { appName } = app;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export default defineConfig({
    name: appName,
    title: globalConfig.apps[appName].title,
    basePath: '/admin',
    projectId,
    dataset: 'production',
    apiVersion: globalConfig.latestUpdate,

    plugins: [
        deskTool(deskStructure),
        languageFilter(languageFilterConfig(appName)),
        colorInput()
        // vercelDeployTool()
        // visionTool()
    ],
    schema: {
        //@ts-ignore
        types: schemaTypes(appName),
        templates: initialValueTemplates
    },
    studio: {
        components: {
            logo: StudioLogo,
            toolMenu: ToolMenuApp
        }
    },
    document: {
        actions: (prev, { schemaType }) => {
            if (!globalConfig.apps[appName].schemas.create.includes(schemaType as DocumentAny)) {
                return prev.filter(
                    prevAction =>
                        prevAction.action !== 'unpublish' &&
                        prevAction.action !== 'delete' &&
                        prevAction.action !== 'duplicate'
                );
            }
            return prev;
        },
        newDocumentOptions: prev => {
            return prev.filter(action =>
                globalConfig.apps[appName].schemas.create.includes(action.templateId as DocumentAny)
            );
        }

        // {
        //     return globalConfig.apps[appName].schemas.documents.map(docType => ({
        //         title: capitalize(docType),
        //         templateId: `${docType}-by-app`,
        //         type: 'initialValueTemplateItem',
        //         parameters: { appName: appName }
        //     }));
        // }
    }
});
