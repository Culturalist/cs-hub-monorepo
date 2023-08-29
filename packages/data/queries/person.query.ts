import { groq } from 'next-sanity';
import { linkSegment, localePortableTextSegment } from './segments';

export const personQuery = groq`*[_type == 'person' && slug.current == $slug][0]{
    ...,
    description {
        ...,
        ${localePortableTextSegment}
    }
}`;
