import { groq } from 'next-sanity';
import { coverSegment, linkSegment, localePortableTextSegment } from './segments';

export const eventQuery = groq`*[_type == 'event' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    parent-> {
        _type,
        title,
        slug
    },
    label->,
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
        ${coverSegment}
    },
    body[] {
        ...,
        content[] {
            ...,
            links[] {
                ...,
                link {
                    ${linkSegment}
                }
            },
            ${localePortableTextSegment},
            content[] {
                ...,
                ${localePortableTextSegment}
            },
            schedule[] {
                ...,
                description {
                    ...,
                    ${localePortableTextSegment}
                }
            },
            people[]-> {
                ...,
                description {
                    ...,
                    ${localePortableTextSegment}
                }
            },
            events[]->,
            organisations[]->
        }
    },
    theme->
}`;
