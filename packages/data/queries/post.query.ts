import { groq } from 'next-sanity';
import { bodySegment, mediaSegment } from './segments';

export const postQuery = groq`*[_type == 'post' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    parent-> {
        _type,
        title,
        slug
    },
    author->,
    labels[]->,
    covers[] {
        ${mediaSegment}
    },
    body[] {
        ${bodySegment}
    }
}`;
