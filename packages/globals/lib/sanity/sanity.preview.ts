'use client';
import { definePreview } from 'next-sanity/preview';

//Sanity project variables
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
const dataset = 'production';

//Preview mode
function onPublicAccessOnly() {
    throw new Error(`Unable to load preview as you're not logged in`);
}
export const usePreview = definePreview({ projectId, dataset, onPublicAccessOnly });
