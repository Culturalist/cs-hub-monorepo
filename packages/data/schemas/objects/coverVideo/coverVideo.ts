import { defineType, defineField } from "@sanity/types";
import { PlayIcon } from "@sanity/icons";
import { SanityAsset } from "@sanity/image-url/lib/types/types";
import { useMediaList, useMediaInitialValue, UseMedia } from "../coverArray";
import { caseTransform } from "@cs/globals/utils";

export interface CoverVideo {
    _type: "coverVideo";
    _key: string;
    asset?: SanityAsset;
    url?: string;
    useMedia: UseMedia[];
}

export default function coverVideo() {
    return defineType({
        name: "coverVideo",
        title: "Video",
        type: "file",
        description: "Accepted formats: .mp4",
        options: {
            accept: ".mp4"
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
                use: "useMedia"
            },
            prepare({ use }) {
                return {
                    title: "Video",
                    subtitle: Array.isArray(use) ? caseTransform(use.join(" | "), "title") : ""
                };
            }
        },
        icon: PlayIcon
    });
}
