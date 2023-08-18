import { groq } from 'next-sanity';

export const homeQuery = groq`*[_type == 'app' && _id == $appName][0]{
    ...,
    header {
        ...,
        links[]-> {
            ...,
            file{
                ...,
                "url": asset->url
            }
        },
        marker {
            ...,
            link {
                ...,
                file {
                    ...,
                    "url": asset->url
                }
            }
        }
    },
    footer {
        ...,
        links[]-> {
            ...,
            file{
                ...,
                "url": asset->url
            }
        },
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
                        }
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
                        }
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
                        }
                    }
                }
            }
        }
    }
}`;
