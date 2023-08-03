import { defineCliConfig } from 'sanity/cli';

const projectId = process.env['SANITY_STUDIO_PROJECT_ID'];
const dataset = 'production';

export default defineCliConfig({
    api: {
        projectId,
        dataset
    }
});
