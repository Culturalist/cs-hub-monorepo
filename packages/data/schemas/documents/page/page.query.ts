import { groq } from "next-sanity";
import { bodySegment, mediaBlockSegment } from "../../objects";

export const pageQuery = groq`*[_type == 'page' && slug.current == $slug && (dateTime(publishDate) < dateTime(now()) || !defined(publishDate))][0]{
    ...,
    covers[] {
        ${mediaBlockSegment}
    },
    body[] {
        ${bodySegment}
    },
    palette->
}`;
