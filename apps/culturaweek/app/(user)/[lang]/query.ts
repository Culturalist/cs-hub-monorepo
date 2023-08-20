import { groq } from 'next-sanity';

export const homeQuery = groq`*[_type == 'app' && _id == $appName][0]{
    ...,
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
        ...,
        cards[] {
            ...,
            link {
                ...,
                file{
                    ...,
                    "url": asset->url
                },
                reference->
            }
        },
        links[] {
            ...,
            link {
                ...,
                file{
                    ...,
                    "url": asset->url
                },
                reference->
            }
        },
        theme->
    },
    theme->
}`;
