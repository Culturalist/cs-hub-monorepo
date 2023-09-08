import { groq } from 'next-sanity';
import { bodySegment, mediaSegment } from './segments';

export const projectQuery = groq`*[_type == 'project' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    parent-> {
        _type,
        title,
        slug
    },
    organisations[] {
        ...,
        label->,
        list[]->
    },
    labels[]->,
    covers[] {
        ${mediaSegment}
    },
    body[] {
        ${bodySegment}
    }
}`;
