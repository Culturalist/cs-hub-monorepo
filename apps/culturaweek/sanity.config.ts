import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { languageFilter } from '@sanity/language-filter';
import { colorInput } from '@sanity/color-input';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { globalConfig, appConfig, appName, DocumentAny, capitalize } from 'globals';
import { languageFilterConfig } from 'globals/lib/language-filter';
import { initialValueTemplates, schemaTypes } from 'data/schemas';
import { deskStructure } from 'data/studio';
import { ToolMenuApp } from 'ui';
import StudioLogo from './studio/StudioLogo';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export default defineConfig({
    name: appName,
    title: appConfig.title,
    basePath: '/admin',
    projectId,
    dataset: 'production',
    apiVersion: globalConfig.latestUpdate,

    plugins: [
        deskTool(deskStructure()),
        languageFilter(languageFilterConfig()),
        colorInput(),
        vercelDeployTool()
        // visionTool()
    ],
    schema: {
        //@ts-ignore
        types: schemaTypes(),
        templates: initialValueTemplates
    },
    studio: {
        components: {
            logo: StudioLogo
            // toolMenu: ToolMenuApp
        }
    },
    document: {
        actions: (prev, { schemaType }) => {
            if (!appConfig.schemas.create.includes(schemaType as DocumentAny)) {
                return prev.filter(
                    prevAction =>
                        prevAction.action !== 'unpublish' &&
                        prevAction.action !== 'delete' &&
                        prevAction.action !== 'duplicate'
                );
            }
            return prev;
        },
        newDocumentOptions: () => {
            return appConfig.schemas.create.map(docType => ({
                title: capitalize(docType),
                templateId: `${docType}-with-initial`,
                type: 'initialValueTemplateItem'
            }));
        }
    }
});
