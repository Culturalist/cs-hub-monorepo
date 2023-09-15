import { groq } from 'next-sanity';
import { localePortableTextSegment } from '../../objects';

export const personQuery = groq`*[_type == 'person' && slug.current == $slug][0]{
    ...,
    description {
        ...,
        ${localePortableTextSegment}
    }
}`;
