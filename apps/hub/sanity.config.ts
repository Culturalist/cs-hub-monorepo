import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { visionTool } from '@sanity/vision';
import deskStructure from './studio/deskStructure';
import StudioLogo from './studio/StudioLogo';
import globalConfig from 'globals/globalConfig';
import { DocumentAny, initialValueTemplates, schemaTypes } from 'data/schemas';
import { languageFilter } from '@sanity/language-filter';
import { languageFilterConfig } from 'globals/lib/language-filter';
import { colorInput } from '@sanity/color-input';
import app from './app.json';

const { appName } = app;
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '';

export default defineConfig({
    name: appName,
    title: globalConfig.apps[appName].title,
    projectId,
    dataset: 'production',
    apiVersion: globalConfig.latestUpdate,

    plugins: [
        //@ts-ignore
        deskTool(deskStructure),
        languageFilter(languageFilterConfig(appName)),
        vercelDeployTool(),
        colorInput(),
        visionTool()
    ],

    schema: {
        //@ts-ignore
        types: schemaTypes(appName),
        templates: initialValueTemplates
    },
    studio: {
        components: {
            logo: StudioLogo
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
    }
});
