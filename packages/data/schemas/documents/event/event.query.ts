import { groq } from 'next-sanity';
import { bodySegment, linkTypedSegment, mediaBlockSegment } from '../../objects';

export const eventQuery = groq`*[_type == 'event' && slug.current == $slug][0]{
    ...,
    parent-> {
        _type,
        title,
        slug
    },
    labels[]->,
    lineup[] {
        ...,
        label->,
        list[]->
    },
    action {
        ...,
        link {
            ${linkTypedSegment}
        }
    },
    covers[] {
        ${mediaBlockSegment}
    },
    body[] {
        ${bodySegment}
    },
    theme->
}`;
