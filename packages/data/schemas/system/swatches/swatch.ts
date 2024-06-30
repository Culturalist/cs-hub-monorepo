import { defineType, defineField } from "@sanity/types";
import { DropIcon } from "@sanity/icons";
import { Color } from "@weresk/core";
import { SwatchIcon } from "./swatch.icon";
import { defaultSwatches } from "./swatch.values";

export interface Swatch {
    _type: "swatch";
    _ref?: string;
    color?: Color;
}

export default function swatch() {
    return defineType({
        name: "swatch",
        title: "Swatch",
        type: "object",
        fields: [
            defineField({
                name: "color",
                title: "Color",
                type: "color",
                options: {
                    colorList: defaultSwatches
                }
            })
        ],
        preview: {
            select: {
                color: "color.hex"
            },
            prepare({ color }) {
                return {
                    title: color || "Color",
                    media: SwatchIcon({ color })
                };
            }
        },
        icon: DropIcon
    });
}
