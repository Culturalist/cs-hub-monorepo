import { groq } from 'next-sanity';

export const eventQuery = groq`*[_type == 'event' && slug.current == $slug && app._ref == $appName][0]{
    ...
}`;
