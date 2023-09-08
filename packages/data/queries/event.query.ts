import { groq } from 'next-sanity';
import { bodySegment, mediaSegment, linkSegment, localePortableTextSegment } from './segments';

export const eventQuery = groq`*[_type == 'event' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    parent-> {
        _type,
        title,
        slug
    },
    labels[]->,
    lineup[] {
        ...,
        label->,
        list[]->
    },
    action {
        ...,
        link {
            ${linkSegment}
        }
    },
    covers[] {
        ${mediaSegment}
    },
    body[] {
        ${bodySegment}
    },
    theme->
}`;
