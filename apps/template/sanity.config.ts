import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import deskStructure from './studio/deskStructure';
import ToolMenu from './studio/ToolMenu';
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
    projectId,
    dataset: 'production',
    apiVersion: globalConfig.latestUpdate,

    plugins: [
        deskTool(deskStructure),
        languageFilter(languageFilterConfig(appName))
        // visionTool(),
    ],
    schema: {
        types: schemaTypes
        // templates: templates
    },
    studio: {
        components: {
            logo: StudioLogo,
            toolMenu: ToolMenu
        }
    }
});
