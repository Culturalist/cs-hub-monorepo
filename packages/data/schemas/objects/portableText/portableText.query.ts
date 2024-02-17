import { groq } from "next-sanity";
import { linkTypedSegment } from "../linkTyped";

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
`;
