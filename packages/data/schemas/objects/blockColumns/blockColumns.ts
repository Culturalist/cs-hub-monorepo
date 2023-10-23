import { defineType, defineField } from "@sanity/types";
import { SplitVerticalIcon } from "@sanity/icons";
import { LocalePortableText } from "../localePortableText";
import { globalConfig } from "@cs/globals";

export interface BlockColumns {
    _type: "blockColumns";
    content?: LocalePortableText[];
}

export default function blockColumns() {
    return defineType({
        name: "blockColumns",
        title: "Columns",
        type: "object",
        fields: [
            defineField({
                name: "content",
                title: "Content",
                type: "array",
                description:
                    "Any number of text blocks will be automatically grouped in 2 columns layout",
                of: [
                    {
                        type: "localePortableTextColumn"
                    }
                ]
            })
        ],
        preview: {
            select: {
                content: `content.0.${globalConfig.localization.default}`
            },
            prepare({ content }) {
                const title =
                    content && content[0]._type === "block"
                        ? content[0].children[0].text
                        : null;
                return {
                    title: title || "Columns",
                    subtitle: title ? "Columns" : ""
                };
            }
        },
        icon: SplitVerticalIcon
    });
}
