import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import deskStructure from './studio/deskStructure';
import StudioLogo from './studio/StudioLogo';
import ToolMenu from './studio/ToolMenu';
import { templates } from './studio/templates';
import globalConfig from 'globals/globalConfig';
import { schemaTypes } from './studio/schemaTypes';

const name = process.env['NEXT_PUBLIC_APP_NAME'] || 'template';
const projectId = process.env['NEXT_PUBLIC_SANITY_PROJECT_ID'] || '';
const dataset = 'production';
const apiVersion = process.env['NEXT_PUBLIC_SANITY_API_VERSION'];

export default defineConfig({
    name,
    title: globalConfig.apps[name].title,
    basePath: '/admin',
    projectId,
    dataset,
    apiVersion,

    plugins: [
        deskTool(deskStructure)
        // visionTool(),
        //Based on project localization config, decide if to add languageFilter and to configure it
        // ...(wereskConfig.localization && typeof wereskConfig.localization === 'object'
        //     ? [
        //           languageFilter({
        //               supportedLanguages: wereskConfig.localization.languages,
        //               defaultLanguages: [],
        //               documentTypes: localeDocuments,
        //               filterField: (enclosingType, field, selectedLanguageIds) =>
        //                   !enclosingType.name.startsWith('locale') || selectedLanguageIds.includes(field.name)
        //           })
        //       ]
        //     : [])
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
