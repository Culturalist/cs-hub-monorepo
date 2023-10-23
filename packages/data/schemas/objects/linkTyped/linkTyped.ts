import { defineType, defineField } from "@sanity/types";
import { LinkType, linkTypeList } from "./linkTyped.values";
import { FileObject, appConfig } from "@cs/globals";
import { PageDocument } from "../../documents";

export interface LinkTyped {
    _type: "linkTyped";
    _key?: string;
    type: LinkType;
    reference?: PageDocument;
    href?: string;
    internal?: string;
    anchor?: string;
    file?: FileObject;
}

export default function linkTyped() {
    return defineType({
        name: "linkTyped",
        title: "Link",
        type: "object",
        fields: [
            defineField({
                name: "type",
                title: "Type",
                type: "string",
                initialValue: "reference",
                options: {
                    list: linkTypeList,
                    layout: "radio",
                    direction: "horizontal"
                },
                validation: (Rule) => Rule.required()
            }),
            defineField({
                name: "reference",
                title: "Reference",
                type: "reference",
                description: "Reference to a page to link to",
                to: appConfig.schemas.links.map((docType) => ({
                    type: docType
                })),
                options: {
                    disableNew: true
                },
                hidden: ({ parent }) => parent?.type !== "reference"
            }),
            defineField({
                name: "href",
                title: "URL",
                type: "url",
                description: `URL starts with "http://" or "https://" and email with "mailto"`,
                validation: (Rule) =>
                    Rule.uri({
                        scheme: ["http", "https", "mailto"]
                    }),
                hidden: ({ parent }) => parent?.type !== "external"
            }),
            defineField({
                name: "internal",
                title: "URL",
                type: "url",
                description: `Relative URL starts with "/" and can contain anchors and queries`,
                validation: (Rule) =>
                    Rule.uri({
                        allowRelative: true
                    }),
                hidden: ({ parent }) => parent?.type !== "internal"
            }),
            defineField({
                name: "anchor",
                title: "Anchor",
                type: "string",
                description: "ID of the block on the same page",
                hidden: ({ parent }) => parent?.type !== "anchor"
            }),
            defineField({
                name: "file",
                title: "File",
                type: "file",
                options: {
                    storeOriginalFilename: true
                },
                hidden: ({ parent }) => parent?.type !== "file"
            })
        ]
    });
}
