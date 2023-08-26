import { groq } from 'next-sanity';

export const layoutQuery = groq`*[_type == 'app' && _id == $appName][0]{
    header {
        ...,
        links[]->,
        marker {
            ...,
            link {
                ...,
                file {
                    ...,
                    "url": asset->url
                },
                reference->
            }
        }
    },
    footer {
        ...,
        links[]->,
        contacts {
            ...,
            fi[] {
                ...,
                markDefs[] {
                    ...,
                    file{
                        ...,
                        "url": asset->url
                    },
                    reference->
                }
            },
            ru[] {
                ...,
                markDefs[] {
                    ...,
                    link {
                        ...,
                        file{
                            ...,
                            "url": asset->url
                        },
                        reference->
                    }
                }
            },
            en[] {
                ...,
                markDefs[] {
                    ...,
                    link {
                        ...,
                        file{
                            ...,
                            "url": asset->url
                        },
                        reference->
                    }
                }
            }
        }
    },
    hero {
        hideFooter
    },
    theme->
}`;
