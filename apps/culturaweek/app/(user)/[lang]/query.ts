import { groq } from 'next-sanity';

export const homeQuery = groq`*[_type == 'app' && _id == $appName][0]{...}`;
