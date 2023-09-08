import { groq } from 'next-sanity';
import { bodySegment, mediaSegment, linkSegment, localePortableTextSegment } from './segments';

export const homeQuery = groq`*[_type == 'app' && _id == $appName][0]{
    ...,
    hero {
        ...,
        covers[] {
            ...,
            ${mediaSegment}
        },
        cards[] {
            ...,
            link {
                ${linkSegment}
            }
        },
        links[] {
            ...,
            link {
                ${linkSegment}
            }
        },
        theme->
    },
    body[] {
        ${bodySegment}
    },
    header {
        ...,
        links[]->,
        marker {
            ...,
            link {
                ${linkSegment}
            }
        }
    },
    footer {
        ...,
        links[]->,
        contacts {
            ...,
            ${localePortableTextSegment}
        }
    },
    theme->
}`;
