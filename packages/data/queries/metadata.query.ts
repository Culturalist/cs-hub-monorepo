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

export const metadataPageQuery = groq`*[_type == $type && slug.current == $slug && app._ref == $appName][0]{
    _type,
    title,
    subtitle,
    position,
    photo,
    covers[] {
        ...,
        asset->
    },
    lineup[] {
        label->,
        list[]-> {
            title
        }
    },
    dates[],
    metadata {
        ...,
        sharedVideo {
            ...,
            "url": asset->url
        }
    }
}`;
