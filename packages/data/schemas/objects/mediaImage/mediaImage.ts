import { defineType, defineField } from "@sanity/types";
import { ImageIcon } from "@sanity/icons";
import { LocaleString } from "../localeString";
import { selectDefaultLocale } from "../../../utils";
import { ImageObject } from "@cs/globals";

export interface MediaImage extends ImageObject {
    _type: "mediaImage";
    _key: string;
    alt?: LocaleString;
    caption?: LocaleString;
}

export default function mediaImage() {
    return defineType({
        name: "mediaImage",
        title: "Image",
        type: "image",
        options: {
            hotspot: true
        },
        fields: [
            defineField({
                name: "alt",
                title: "Alternative text",
                type: "localeString",
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }),
            defineField({
                name: "caption",
                title: "Caption",
                type: "localeString",
                options: {
                    collapsible: true,
                    collapsed: true
                }
            })
        ],
        preview: {
            select: {
                alt: "alt",
                caption: "caption",
                media: "asset"
            },
            prepare({ alt, caption, media }) {
                const title = selectDefaultLocale(alt) || selectDefaultLocale(caption);
                return {
                    title: title || "Image",
                    subtitle: title ? "Image" : "",
                    media
                };
            }
        },
        icon: ImageIcon
    });
}
