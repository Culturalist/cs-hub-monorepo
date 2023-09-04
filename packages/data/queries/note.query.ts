import { groq } from 'next-sanity';
import { bodySegment, coverSegment } from './segments';

export const noteQuery = groq`*[_type == 'note' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    covers[] {
        ${coverSegment}
    },
    body[] {
        ${bodySegment}
    }
}`;
