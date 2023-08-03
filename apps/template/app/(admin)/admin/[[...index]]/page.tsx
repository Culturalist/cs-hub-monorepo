'use client';

import { NextStudio } from 'next-sanity/studio';

import config from '../../../../sanity.config';

export default function Studio() {
    //  Supports the same props as `import {Studio} from 'sanity'`, `config` is required
    return <NextStudio config={config} />;
}

// import { Studio } from './Studio';

// // Set the right `viewport`, `robots` and `referer` meta tags
// export { metadata } from 'next-sanity/studio/metadata';

// export default function StudioPage() {
//     return <Studio />;
// }
