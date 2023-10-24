import { defineArrayMember, defineField } from "@sanity/types";
import { LinkIcon } from "@sanity/icons";
import { appConfig } from "@cs/globals";
import { type LinkTyped, linkTypeList } from "../linkTyped";

const portableTextLink = () =>
    defineArrayMember({
        name: "link",
        type: "object",
        title: "Link",
        icon: LinkIcon,
        fields: [
            defineField({
                name: "type",
                title: "Type",
                type: "string",
                initialValue: "external",
                options: {
                    list: linkTypeList,
                    layout: "radio",
                    direction: "horizontal"
                }
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
                hidden: ({ parent }: { parent: LinkTyped | undefined }) => parent?.type !== "reference"
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
                hidden: ({ parent }: { parent: LinkTyped | undefined }) =>
                    !(parent?.type === "external" || !parent?.type)
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
                hidden: ({ parent }: { parent: LinkTyped | undefined }) => parent?.type !== "internal"
            }),
            defineField({
                name: "anchor",
                title: "Anchor",
                type: "string",
                description: "ID of the block on the same page",
                hidden: ({ parent }: { parent: LinkTyped | undefined }) => parent?.type !== "anchor"
            }),
            defineField({
                name: "file",
                title: "File",
                type: "file",
                hidden: ({ parent }: { parent: LinkTyped | undefined }) => parent?.type !== "file"
            })
        ]
    });

export default portableTextLink;
