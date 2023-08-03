import { createClient as createClientNext } from 'next-sanity';
import { createClient } from '@sanity/client';
import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

//Sanity project variables
const projectId = process.env['SANITY_STUDIO_PROJECT_ID'] || '';
const dataset = 'production';
const apiVersion = process.env['SANITY_STUDIO_API_VERSION'];

//Sanity Next client
export const client = createClient({
    projectId,
    dataset,
    apiVersion, // https://www.sanity.io/docs/api-versioning
    useCdn: true // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
});

//Sanity Next client
export const clientNext = createClientNext({
    projectId,
    dataset,
    apiVersion, // https://www.sanity.io/docs/api-versioning
    useCdn: true // if you're using ISR or only static generation at build time then you can set this to `false` to guarantee no stale content
});

//Image URL Builder
export const getImageUrl = (source: SanityImageSource, width?: number, height?: number): string => {
    let urlBuilder = createImageUrlBuilder({ projectId, dataset }).image(source).auto('format').fit('max');
    urlBuilder = width ? urlBuilder.width(width) : urlBuilder;
    urlBuilder = height ? urlBuilder.height(height) : urlBuilder;
    return urlBuilder.url();
};
