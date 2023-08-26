import { groq } from 'next-sanity';

export const personQuery = groq`*[_type == 'person' && slug.current == $slug][0]{
    ...
}`;
