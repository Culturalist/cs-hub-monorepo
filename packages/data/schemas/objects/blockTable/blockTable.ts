import { defineType, defineField } from "@sanity/types";
import { ThListIcon } from "@sanity/icons";
import { selectDefaultLocale } from "../../../utils";
import { LocaleString } from "../localeString";
import { LocaleTable } from "../localeTable";
import { globalConfig } from "@cs/globals";
import { TableHeaderOption, tableHeadersInitialValue, tableHeadersOptionsList } from "./blockTable.values";

export interface BlockTable {
    _type: "blockTable";
    _key: string;
    title?: LocaleString;
    data?: LocaleTable;
    headers?: TableHeaderOption[];
}

export default function blockTable() {
    return defineType({
        name: "blockTable",
        title: "Table",
        type: "object",
        fieldsets: [
            {
                name: "style",
                title: "Style",
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }
        ],
        fields: [
            defineField({
                name: "title",
                title: "Title",
                type: "localeString"
                // options: {
                //     collapsible: true,
                //     collapsed: true
                // }
            }),
            defineField({
                name: "data",
                title: "Data",
                type: "localeTable"
            }),
            defineField({
                name: "headers",
                title: "Headers",
                type: "array",
                of: [{ type: "string" }],
                initialValue: tableHeadersInitialValue,
                options: {
                    list: tableHeadersOptionsList,
                    layout: "grid"
                },
                fieldset: "style"
            })
        ],
        preview: {
            select: {
                title: "title",
                corner: `data.${globalConfig.localization.default}.rows[0].cells[0]`
            },
            prepare({ title, corner }) {
                const localeTitle = selectDefaultLocale(title) || corner;
                return {
                    title: localeTitle || "Table",
                    subtitle: localeTitle ? "Table" : ""
                };
            }
        },
        icon: ThListIcon
    });
}
