import { defineType, defineField, SanityDocument } from "@sanity/types";
import { DropIcon } from "@sanity/icons";
import { Swatch } from "./swatch";

export interface Swatches extends SanityDocument {
    _type: "swatches" | "reference";
    _ref?: string;
    title?: string;
    swatches?: Swatch[];
}

export default function swatches() {
    return defineType({
        name: "swatches",
        title: "Swatches",
        type: "document",
        fields: [
            defineField({
                name: "title",
                title: "Title",
                type: "string"
            }),
            defineField({
                name: "swatches",
                title: "Swatches",
                type: "array",
                of: [{ type: "swatch" }]
            })
        ],
        preview: {
            select: {
                title: "title"
            },
            prepare({ title }) {
                return {
                    title: title || "Swatches",
                    subtitle: title ? "Swatches" : ""
                };
            }
        },
        icon: DropIcon,
        __experimental_omnisearch_visibility: false
    });
}
