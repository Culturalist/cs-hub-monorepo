import { defineType, defineField } from "@sanity/types";
import { TableValue } from "@weresk/core";
import { globalConfig, Locale } from "@cs/globals";

export type LocaleTable = Record<Locale, TableValue>;

export default function localeTable() {
    return defineType({
        name: "localeTable",
        title: "Locale Table",
        type: "object",
        fields: [
            ...globalConfig.localization.languages.map((lang) =>
                defineField({
                    title: lang.title,
                    name: lang.id,
                    type: "table",
                    options: {
                        collapsed: false
                    }
                })
            )
        ]
    });
}
