import { groq } from 'next-sanity';
import { linkTypedSegment, localePortableTextSegment } from '../../objects';

export const layoutQuery = groq`*[_type == 'app' && _id == $appName][0]{
    languages[],
    header {
        ...,
        links[]->,
        marker {
            ...,
            link {
                ${linkTypedSegment}
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
