import { defineType, defineField } from "@sanity/types";
import { BlockquoteIcon } from "@sanity/icons";
import { globalConfig, capitalize, Locale } from "@cs/globals";
import { BlockParent, PortableTextBlock } from "../portableText";

interface SchemaProps {
    parent: BlockParent;
}

export type LocalePortableText = Record<Locale, PortableTextBlock> & {
    _type: `localePortableText${Capitalize<BlockParent>}`;
    typeClass: "blockText";
};

export default function localePortableText({ parent }: SchemaProps) {
    return defineType({
        name: `localePortableText${capitalize(parent)}`,
        title: "Text",
        type: "object",
        fields: [
            ...globalConfig.localization.languages.map((lang) =>
                defineField({
                    title: lang.title,
                    name: lang.id,
                    type: `portableText${capitalize(parent)}`
                })
            ),
            defineField({
                name: "typeClass",
                title: "Class",
                type: "string",
                initialValue: "blockText",
                hidden: true,
                readOnly: true
            })
        ],
        preview: {
            select: {
                content: globalConfig.localization.default
            },
            prepare({ content }) {
                const title =
                    content && content[0]._type === "block"
                        ? content[0].children[0].text
                        : null;
                return {
                    title: title || "Text",
                    subtitle: title ? "Text" : ""
                };
            }
        },
        icon: BlockquoteIcon
    });
}
