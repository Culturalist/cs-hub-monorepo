import { groq } from 'next-sanity';

export const homeQuery = groq`*[_type == 'app' && _id == $appName][0]{
    ...,
    header {
        ...,
        links[]->{
            ...,
            file{
                ...,
                "url": asset->url
            }
        },
        marker{
            ...,
            link{
                ...,
                file{
                    ...,
                    "url": asset->url
                }
            }
        }
    }
}`;
