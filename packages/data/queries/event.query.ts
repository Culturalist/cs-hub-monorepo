import { groq } from 'next-sanity';

export const eventQuery = groq`*[_type == 'event' && slug.current == $slug && app._ref == $appName][0]{
    ...,
    parent-> {
        _type,
        title,
        slug
    },
    label->,
    lineup[] {
        ...,
        label->,
        list[]->
    },
    action {
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
