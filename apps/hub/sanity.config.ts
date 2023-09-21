import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { visionTool } from '@sanity/vision';
import deskStructure from './studio/deskStructure';
import StudioLogo from './studio/StudioLogo';
import { globalConfig, DocumentAny, appConfig, appName } from 'globals';
import { initialValueTemplates, schemaTypes } from 'data/schemas';
import { languageFilter } from '@sanity/language-filter';
import { languageFilterConfig } from 'globals/lib/language-filter';
import { colorInput } from '@sanity/color-input';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || '';

export default defineConfig({
    name: appName,
    title: appConfig.title,
    projectId,
    dataset: 'production',
    apiVersion: globalConfig.latestUpdate,

    plugins: [
        //@ts-ignore
        deskTool(deskStructure),
        languageFilter(languageFilterConfig()),
        vercelDeployTool(),
        colorInput(),
        visionTool()
    ],

    schema: {
        //@ts-ignore
        types: schemaTypes(),
        templates: initialValueTemplates
    },
    studio: {
        components: {
            logo: StudioLogo
        }
    },
    document: {
        actions: (prev, { schemaType }) => {
            if (!appConfig.schemas.create.includes(schemaType as DocumentAny)) {
                return prev.filter(
                    prevAction =>
                        prevAction.action !== 'unpublish' &&
                        // prevAction.action !== 'delete' &&
                        prevAction.action !== 'duplicate'
                );
            }
            return prev;
        },
        newDocumentOptions: prev => {
            return prev.filter(action => appConfig.schemas.create.includes(action.templateId as DocumentAny));
        }
    }
});
