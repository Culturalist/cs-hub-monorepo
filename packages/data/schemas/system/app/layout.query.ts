import { groq } from "next-sanity";
import { linkTypedSegment, localePortableTextSegment } from "../../objects";

export const layoutQuery = groq`*[_type == 'app' && _id == $appName][0]{
    title,
    languages[],
    header {
        ...,
        links[] {
            _type == 'reference' => @->,
            _type != 'reference' => @
        },
        marker {
            ...,
            link {
                ${linkTypedSegment}
            }
        }
    },
    footer {
        ...,
        links[] {
            _type == 'reference' => @->,
            _type != 'reference' => @
        },
        contacts {
            ...,
            ${localePortableTextSegment}
        }
    },
    hero {
        hideFooter
    },
    palette->
}`;
