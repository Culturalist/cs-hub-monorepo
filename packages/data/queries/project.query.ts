import { groq } from 'next-sanity';
import { bodySegment, coverSegment } from './segments';

export const projectQuery = groq`*[_type == 'project' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    parent-> {
        _type,
        title,
        slug
    },
    labels[]->,
    covers[] {
        ${coverSegment}
    },
    body[] {
        ${bodySegment}
    }
}`;
