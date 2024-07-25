import { defineField } from "@sanity/types";
import { capitalize, Block } from "@cs/globals";
import { BlockParent, portableTextDefinitions } from "./portableText.values";
import { LeadStyle, SmallStyle } from "./portableText.styles";
import portableTextLink from "./portableText.link";

interface SchemaProps {
    parent: BlockParent;
}

export type PortableTextBlock = Block;

export default function portableText({ parent }: SchemaProps) {
    return defineField({
        name: `portableText${capitalize(parent)}`,
        title: "Portable Text",
        type: "array",
        of: [
            {
                type: "block",
                styles: [
                    { title: "Normal", value: "normal" },
                    {
                        title: "Lead",
                        value: "lead",
                        component: LeadStyle
                    },
                    { title: "H3", value: "h3" },
                    { title: "H4", value: "h4" },
                    {
                        title: "Small",
                        value: "small",
                        component: SmallStyle
                    }
                ].filter((style) => portableTextDefinitions.styles[parent].includes(style.value)),
                lists: [
                    { title: "Bullet", value: "bullet" },
                    { title: "Numbered", value: "number" }
                ].filter((style) => portableTextDefinitions.lists[parent].includes(style.value)),
                marks: {
                    decorators: [
                        // { title: 'Emphasis', value: 'em' },
                        { title: "Strong", value: "strong" },
                        { title: "Underline", value: "underline" },
                        { title: "Strikethrough", value: "strike-through" }
                    ],
                    annotations: [portableTextLink()].filter(
                        (field) => field.name && portableTextDefinitions.annotations[parent].includes(field.name)
                    )
                }
            },
            ...[
                {
                    type: "mediaImage"
                },
                {
                    type: "blockLinks"
                },
                {
                    type: "blockTable"
                },
                {
                    type: "blockChart"
                }
            ].filter((field) => portableTextDefinitions.blocks[parent].includes(field.type))
        ]
    });
}
