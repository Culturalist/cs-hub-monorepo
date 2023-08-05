import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { vercelDeployTool } from 'sanity-plugin-vercel-deploy';
import { visionTool } from '@sanity/vision';
import StudioLogo from './studio/StudioLogo';
import globalConfig from 'globals/globalConfig';
import { schemaTypes } from 'data/schemas';
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
        deskTool(),
        languageFilter(languageFilterConfig(appName)),
        vercelDeployTool(),
        colorInput()
        // visionTool()
    ],

    schema: {
        types: schemaTypes(appName)
    },
    studio: {
        components: {
            logo: StudioLogo
        }
    }
});
