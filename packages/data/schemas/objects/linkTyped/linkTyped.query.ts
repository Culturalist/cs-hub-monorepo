import { groq } from "next-sanity";

export const linkTypedSegment = groq`
    ...,
    file{
        ...,
        "url": asset->url
    },
    reference->
`;
