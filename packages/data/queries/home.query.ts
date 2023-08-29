import { groq } from 'next-sanity';
import { coverSegment, linkSegment, localePortableTextSegment } from './segments';

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
            }
        }
    },
    theme->
}`;
