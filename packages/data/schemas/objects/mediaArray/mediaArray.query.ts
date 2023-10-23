import { groq } from 'next-sanity';

export const mediaBlockSegment = groq`
    ...,
    "url": asset->url,
    asset->{
        ...,
        metadata
    }
`;
