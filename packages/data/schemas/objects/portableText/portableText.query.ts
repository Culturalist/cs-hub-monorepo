import { groq } from "next-sanity";

export const portableTextSegment = groq`
    ...,
    markDefs[] {
        ...,
        file{
            ...,
            "url": asset->url
        },
        reference->
    }
`;
