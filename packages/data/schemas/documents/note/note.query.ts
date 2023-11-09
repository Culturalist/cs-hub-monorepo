import { groq } from "next-sanity";
import { bodySegment, mediaBlockSegment } from "../../objects";

export const noteQuery = groq`*[_type == 'note' && slug.current == $slug && (dateTime(publishDate) < dateTime(now()) || !defined(publishDate)))][0]{
    ...,
    covers[] {
        ${mediaBlockSegment}
    },
    body[] {
        ${bodySegment}
    }
}`;
