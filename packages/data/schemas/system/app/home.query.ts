import { groq } from "next-sanity";
import { bodySegment, linkTypedSegment, localePortableTextSegment, mediaBlockSegment } from "../../objects";

export const homeQuery = groq`*[_type == 'app' && _id == $appName][0]{
    ...,
    hero {
        ...,
        covers[] {
            ...,
            ${mediaBlockSegment}
        },
        cards[] {
            ...,
            link {
                ${linkTypedSegment}
            }
        },
        links[] {
            ...,
            link {
                ${linkTypedSegment}
            }
        },
        palette->
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
    palette->
}`;
