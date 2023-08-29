import { groq } from 'next-sanity';
import { linkSegment, localePortableTextSegment } from './segments';

export const layoutQuery = groq`*[_type == 'app' && _id == $appName][0]{
    languages[],
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
    hero {
        hideFooter
    },
    theme->
}`;
