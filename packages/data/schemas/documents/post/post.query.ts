import { groq } from 'next-sanity';
import { bodySegment, mediaBlockSegment } from '../../objects';

export const postQuery = groq`*[_type == 'post' && slug.current == $slug][0]{
    ...,
    parent-> {
        _type,
        title,
        slug
    },
    author->,
    labels[]->,
    covers[] {
        ${mediaBlockSegment}
    },
    body[] {
        ${bodySegment}
    }
}`;
