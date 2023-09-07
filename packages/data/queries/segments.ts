export const linkSegment = `
    ...,
    file{
        ...,
        "url": asset->url
    },
    reference->
`;

export const coverSegment = `
    ...,
    "url": asset->url,
    asset->{
        ...,
        metadata
    }
`;

export const localePortableTextSegment = `
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
            file{
                ...,
                "url": asset->url
            },
            reference->
        }
    },
    en[] {
        ...,
        markDefs[] {
            ...,
            file{
                ...,
                "url": asset->url
            },
            reference->
        }
    }
    `;

export const bodySegment = `
    ...,
    content[] {
        ...,
        links[] {
            ...,
            link {
                ${linkSegment}
            }
        },
        ${localePortableTextSegment},
        content[] {
            ...,
            ${localePortableTextSegment}
        },
        schedule[] {
            ...,
            description {
                ...,
                ${localePortableTextSegment}
            }
        },
        manual[] {
            ...,
            link {
                ${linkSegment}
            }
        },
        people[]-> {
            ...,
            description {
                ...,
                ${localePortableTextSegment}
            }
        },
        events[]-> {
            ...,
            lineup[] {
                ...,
                list[]-> {
                    title
                }
            }
        },
        projects[]-> {
            ...,
            labels[]-> {
                title
            }
        },
        posts[]->,
        organisations[]->
    }
`;
