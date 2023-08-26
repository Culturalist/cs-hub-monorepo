import { groq } from 'next-sanity';

export const pageQuery = groq`*[_type == 'page' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    covers[] {
        ...,
        "url": asset->url,
        asset->{
            ...,
            metadata
        }
    },
    body[] {
        ...,
        content[] {
            ...,
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
            },
            content[] {
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
        }
    },
    theme->
}`;
