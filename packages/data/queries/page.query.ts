import { groq } from 'next-sanity';
import { coverSegment, linkSegment, localePortableTextSegment } from './segments';

export const pageQuery = groq`*[_type == 'page' && slug.current == $slug && app._ref == $appName][0]{
    ...,
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
            }
        }
    },
    theme->
}`;
