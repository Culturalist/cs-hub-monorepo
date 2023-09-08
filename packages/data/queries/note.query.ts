import { groq } from 'next-sanity';
import { bodySegment, mediaSegment } from './segments';

export const noteQuery = groq`*[_type == 'note' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    covers[] {
        ${mediaSegment}
    },
    body[] {
        ${bodySegment}
    }
}`;
