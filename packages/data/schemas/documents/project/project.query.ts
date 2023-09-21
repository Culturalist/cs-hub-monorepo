import { groq } from 'next-sanity';
import { bodySegment, mediaBlockSegment } from '../../objects';

export const projectQuery = groq`*[_type == 'project' && slug.current == $slug][0]{
    ...,
    parent-> {
        _type,
        title,
        slug
    },
    organisations[] {
        ...,
        label->,
        list[]->
    },
    labels[]->,
    covers[] {
        ${mediaBlockSegment}
    },
    body[] {
        ${bodySegment}
    }
}`;
