import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import StudioLogo from './studio/StudioLogo';
import globalConfig from 'globals/globalConfig';
import { schemaTypes } from './studio/schemaTypes';

const name = process.env['SANITY_STUDIO_APP_NAME'] || 'template';
const projectId = process.env['SANITY_STUDIO_PROJECT_ID'] || '';
const dataset = 'production';
const apiVersion = process.env['SANITY_STUDIO_API_VERSION'];

export default defineConfig({
    name,
    title: globalConfig.apps[name].title,
    projectId,
    dataset,
    apiVersion,

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
