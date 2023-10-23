import { defineType, defineField } from "@sanity/types";
import { LocaleString } from "../localeString";

export interface CaptionAlt {
    _type: "captionAlt";
    alt?: LocaleString;
    caption?: LocaleString;
}

export default function captionAlt() {
    return defineType({
        name: "captionAlt",
        title: "Caption & Alternative text",
        type: "object",
        fields: [
            defineField({
                name: "caption",
                title: "Caption",
                type: "localeString"
            }),
            defineField({
                name: "alt",
                title: "Alternative text",
                type: "localeString"
            })
        ]
    });
}
