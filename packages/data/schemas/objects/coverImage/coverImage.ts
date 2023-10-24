import { defineType, defineField } from "@sanity/types";
import { ImageIcon } from "@sanity/icons";
import { useMediaList, useMediaInitialValue, UseMedia } from "../coverArray";
import { ImageObject, caseTransform } from "@cs/globals";

export interface CoverImage extends ImageObject {
    _type: "coverImage";
    _key: string;
    useMedia: UseMedia[];
}

export default function coverImage() {
    return defineType({
        name: "coverImage",
        title: "Image",
        type: "image",
        options: {
            hotspot: true
        },
        fields: [
            defineField({
                name: "useMedia",
                title: "Can be used",
                type: "array",
                of: [{ type: "string" }],
                initialValue: useMediaInitialValue,
                options: {
                    list: useMediaList
                    // layout: 'grid'
                },
                validation: (Rule) => Rule.required()
            })
        ],
        preview: {
            select: {
                media: "asset",
                use: "useMedia"
            },
            prepare({ media, use }) {
                return {
                    title: "Image",
                    subtitle: Array.isArray(use) ? caseTransform(use.join(" | "), "title") : "",
                    media
                };
            }
        },
        icon: ImageIcon
    });
}
