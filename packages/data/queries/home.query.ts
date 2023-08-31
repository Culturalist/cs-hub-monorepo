import { groq } from 'next-sanity';
import { bodySegment, coverSegment, linkSegment, localePortableTextSegment } from './segments';

export const homeQuery = groq`*[_type == 'app' && _id == $appName][0]{
    ...,
    hero {
        ...,
        covers[] {
            ...,
            ${coverSegment}
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
