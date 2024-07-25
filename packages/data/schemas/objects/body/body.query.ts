import { linkTypedSegment } from "../linkTyped";
import { localePortableTextSegment } from "../localePortableText";
import { mediaBlockSegment } from "../mediaArray";

export const bodySegment = `
    ...,
    content[] {
        ...,
        links[] {
            ...,
            link {
                ${linkTypedSegment}
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
                ${linkTypedSegment}
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
        organisations[]->,
        media[] {
            ...,
            ${mediaBlockSegment}
        },
        swatches->,
        description {
            ...,
            ${localePortableTextSegment}
        }
    }
`;
