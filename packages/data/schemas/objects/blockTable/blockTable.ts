import { defineType, defineField } from "@sanity/types";
import { ThListIcon } from "@sanity/icons";
import { selectDefaultLocale } from "../../../utils";
import { LocaleString } from "../localeString";
import { LocaleTable } from "../localeTable";
import { globalConfig } from "@cs/globals";
import { TableHeaderOption, tableHeadersInitialValue, tableHeadersOptionsList } from "./blockTable.values";
import { LocalePortableText } from "../localePortableText";
import { Swatches } from "../../system";

export interface BlockTable {
    _type: "blockTable";
    _key: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    data?: LocaleTable;
    swap?: boolean;
    headers?: TableHeaderOption[];
    swatches?: Swatches;
    description?: LocalePortableText;
}

export default function blockTable() {
    return defineType({
        name: "blockTable",
        title: "Table",
        type: "object",
        fieldsets: [
            {
                name: "style",
                title: "Style"
                // options: {
                //     collapsible: true,
                //     collapsed: true
                // }
            }
        ],
        fields: [
            defineField({
                name: "title",
                title: "Title",
                type: "localeString"
            }),
            defineField({
                name: "subtitle",
                title: "Subtitle",
                type: "localeString",
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }),
            defineField({
                name: "data",
                title: "Data",
                type: "localeTable",
                description: `Use /! command to highlight column, row or cell. Use digits after the command to choose different colors from swatches (ex. /!2 – will highlight with second color). In order to select whole row or column, top or left headers must be turned on.`
            }),
            defineField({
                name: "swap",
                title: "Swap rows and columns",
                type: "boolean",
                initialValue: false
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
            }),
            defineField({
                name: "swatches",
                title: "Swatches",
                type: "reference",
                to: [{ type: "swatches" }],
                fieldset: "style"
            }),
            defineField({
                name: "description",
                title: "Description",
                type: "localePortableTextField"
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
