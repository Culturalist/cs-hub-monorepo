import { groq } from "next-sanity";
import { linkTypedSegment } from "../linkTyped";
import { localePortableText } from "../localePortableText";

export const portableTextSegment = groq`
    ...,
    markDefs[] {
        ...,
        file{
            ...,
            "url": asset->url
        },
        reference->
    },
    links[] {
        ...,
        link {
            ${linkTypedSegment}
        }
    },
    swatches->,
    description {
        ...,
        markDefs[] {
            ...,
            file{
                ...,
                "url": asset->url
            },
            reference->
        },
        links[] {
            ...,
            link {
                ${linkTypedSegment}
            }
        }
    }
`;
