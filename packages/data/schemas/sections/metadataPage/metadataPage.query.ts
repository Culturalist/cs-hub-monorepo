import { groq } from 'next-sanity';

export const metadataPageQuery = groq`*[_type == $type && slug.current == $slug][0]{
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
