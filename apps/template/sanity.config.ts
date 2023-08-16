import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import deskStructure from './studio/deskStructure';
import ToolMenu from './studio/ToolMenu';
import StudioLogo from './studio/StudioLogo';
import globalConfig from 'globals/globalConfig';
import { languageFilterConfig } from 'globals/lib/language-filter';
import { initialValueTemplates, schemaTypes } from 'data/schemas';
import { languageFilter } from '@sanity/language-filter';
import { colorInput } from '@sanity/color-input';
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
        languageFilter(languageFilterConfig(appName)),
        colorInput()
        // visionTool(),
    ],
    schema: {
        types: schemaTypes(appName),
        templates: initialValueTemplates
    },
    studio: {
        components: {
            logo: StudioLogo,
            toolMenu: ToolMenu
        }
    }
});
