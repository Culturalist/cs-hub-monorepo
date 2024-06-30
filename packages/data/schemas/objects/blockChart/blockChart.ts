import { defineType, defineField } from "@sanity/types";
import { BarChartIcon } from "@sanity/icons";
import { selectDefaultLocale } from "../../../utils";
import { LocaleString } from "../localeString";
import { LocaleTable } from "../localeTable";
import { globalConfig } from "@cs/globals";
import {
    ChartComponent,
    ChartDesign,
    ChartOrientation,
    chartComponentsInitialValue,
    chartComponentsList,
    chartDesignInitialValue,
    chartDesignList,
    chartOrientationInitialValue,
    chartOrientationList
} from "./blockChart.values";
import { Swatches } from "../../system";

export interface BlockChart {
    _type: "blockChart";
    _key: string;
    title?: LocaleString;
    design: ChartDesign;
    data?: LocaleTable;
    swap?: boolean;
    components?: ChartComponent[];
    orientation: ChartOrientation;
    swatches?: Swatches;
}

export default function blockChart() {
    return defineType({
        name: "blockChart",
        title: "Chart",
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
            }),
            defineField({
                name: "design",
                title: "Design",
                type: "string",
                initialValue: chartDesignInitialValue,
                options: {
                    list: chartDesignList,
                    layout: "radio",
                    direction: "horizontal"
                },
                validation: (Rule) => Rule.required()
            }),

            defineField({
                name: "orientation",
                title: "Orientation",
                type: "string",
                initialValue: chartOrientationInitialValue,
                options: {
                    list: chartOrientationList,
                    layout: "radio",
                    direction: "horizontal"
                },
                validation: (Rule) => Rule.required(),
                hidden: ({ parent }: { parent: BlockChart | undefined }) => parent?.design === "pie"
            }),
            defineField({
                name: "data",
                title: "Data",
                type: "localeTable"
            }),
            defineField({
                name: "swap",
                title: "Swap rows and columns",
                type: "boolean",
                initialValue: false
            }),
            defineField({
                name: "components",
                title: "Components",
                type: "array",
                of: [{ type: "string" }],
                initialValue: chartComponentsInitialValue,
                options: {
                    list: chartComponentsList,
                    layout: "grid"
                },
                // hidden: ({ parent }: { parent: BlockChart | undefined }) => parent?.design === "pie",
                fieldset: "style"
            }),
            defineField({
                name: "swatches",
                title: "Swatches",
                type: "reference",
                to: [{ type: "swatches" }],
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
                    title: localeTitle || "Chart",
                    subtitle: localeTitle ? "Chart" : ""
                };
            }
        },
        icon: BarChartIcon
    });
}
