import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import deskStructure from './studio/deskStructure';
import StudioLogo from './studio/StudioLogo';
import globalConfig from 'globals/globalConfig';
import { languageFilterConfig } from 'globals/lib/language-filter';
import { schemaTypes } from './studio/schemaTypes';
import { languageFilter } from '@sanity/language-filter';
import app from './app.json';

const { appName } = app;
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export default defineConfig({
    name: appName,
    title: globalConfig.apps[appName].title,
    basePath: '/admin',
    projectId: '96e1dixo',
    dataset: 'production',
    apiVersion: globalConfig.latestUpdate,

    plugins: [
        deskTool(deskStructure),
        languageFilter(languageFilterConfig(appName))
        // visionTool(),
    ],
    // document: {
    //     actions: (prev, { schemaType }) => {
    //         if (singleDocuments.includes(schemaType)) {
    //             return prev.filter(
    //                 prevAction =>
    //                     prevAction.action !== 'unpublish' &&
    //                     prevAction.action !== 'delete' &&
    //                     prevAction.action !== 'duplicate'
    //             );
    //         }
    //         return prev;
    //     },
    //     newDocumentOptions: prev => {
    //         return prev.filter(action => !singleDocuments.includes(action.templateId));
    //     }
    // },
    schema: {
        types: schemaTypes
        // templates: templates
    },
    studio: {
        components: {
            logo: StudioLogo
            // toolMenu: ToolMenu
        }
    }
});
