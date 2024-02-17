import { defineType, defineField } from "@sanity/types";
import { LinkIcon } from "@sanity/icons";
import { selectDefaultLocale, linkPreview } from "../../../utils";
import { LocaleString } from "../localeString";
import { LinkTyped } from "../linkTyped";

export interface LinkExternal {
    _type: "linkExternal";
    _key: string;
    caption?: LocaleString;
    href?: string;
}

export default function linkExternal() {
    return defineType({
        name: "linkExternal",
        title: "Link",
        type: "object",
        fields: [
            defineField({
                name: "caption",
                title: "Caption",
                type: "localeString",
                options: {
                    collapsed: false
                }
            }),
            defineField({
                name: "href",
                title: "URL",
                type: "url",
                description: `URL starts with "http://" or "https://" and email with "mailto"`,
                validation: (Rule) =>
                    Rule.uri({
                        scheme: ["http", "https", "mailto"]
                    })
            })
        ],
        preview: {
            select: {
                caption: "caption",
                url: "href"
            },
            prepare({ caption, url }) {
                const localeCaption = selectDefaultLocale(caption);
                return {
                    title: localeCaption || "Link",
                    subtitle: url
                };
            }
        },
        icon: LinkIcon
    });
}
