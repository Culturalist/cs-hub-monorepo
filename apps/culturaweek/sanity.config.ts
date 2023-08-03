import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import ToolMenu from './studio/ToolMenu';
import deskStructure from './studio/deskStructure';
import StudioLogo from './studio/StudioLogo';
import globalConfig from 'globals/globalConfig';
import { schemaTypes } from './studio/schemaTypes';
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
        deskTool(deskStructure)
        // vercelDeployTool()
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
