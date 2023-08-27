import { groq } from 'next-sanity';

export const langQuery = groq`*[_type == 'app' && _id == $appName][0]{
    languages
}`;
