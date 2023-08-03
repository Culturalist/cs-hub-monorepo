import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import StudioLogo from './studio/StudioLogo';
import globalConfig from 'globals/globalConfig';
import { schemaTypes } from './studio/schemaTypes';
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
        deskTool()
        // visionTool()
    ],

    schema: {
        types: schemaTypes
    },
    studio: {
        components: {
            logo: StudioLogo
        }
    }
});
