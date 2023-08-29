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
    `;
