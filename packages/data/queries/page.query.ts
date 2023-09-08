import { groq } from 'next-sanity';
import { bodySegment, mediaSegment, linkSegment, localePortableTextSegment } from './segments';

export const pageQuery = groq`*[_type == 'page' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    covers[] {
        ${mediaSegment}
    },
    body[] {
        ${bodySegment}
    },
    theme->
}`;
