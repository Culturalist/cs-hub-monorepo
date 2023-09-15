import { groq } from 'next-sanity';

export const metadataAppQuery = groq`*[_type == 'app' && _id == $appName][0]{
    title,
    languages,
    metadata {
        ...,
        sharedVideo {
            ...,
            "url": asset->url
        }
    }
}`;
