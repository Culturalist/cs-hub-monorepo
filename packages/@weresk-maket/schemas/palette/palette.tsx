import { defineType, defineField } from "@sanity/types";
import { SunIcon } from "@sanity/icons";
import type { Color } from "@weresk/core";
import { defaultFields, defaultSwatches } from "./palette.values";
import { PaletteIcon } from "./palette.icon";
import type { PaletteField } from "./palette.values";

export interface PaletteSchemaProps {
    set?: PaletteField[];
    extend?: PaletteField[];
    swatches?: string[];
}

export type Palette = Record<string, Color> & {
    _id: string;
    _rev: string;
    _type: "palette" | "reference";
    _ref?: string;
    name: string;
};

export default function palette(props: PaletteSchemaProps) {
    const { set = defaultFields, extend = [], swatches = defaultSwatches } = props;
    return defineType({
        name: "palette",
        title: "Palette",
        type: "document",
        fields: [
            defineField({
                name: "name",
                title: "Palette name",
                type: "string",
                validation: (Rule) => Rule.required()
            }),
            ...[...set, ...extend].map(({ name, title, description }) =>
                defineField({
                    name,
                    title,
                    description,
                    type: "color",
                    options: {
                        colorList: swatches
                    },
                    validation: (Rule) => Rule.required()
                })
            )
        ],
        preview: {
            select: {
                name: "name",
                surface: "surface.hex",
                text: "on_surface.hex",
                textLight: "on_surface_light.hex",
                cardSurface: "primary.hex",
                cardText: "on_primary.hex"
            },
            prepare({ name, surface, text, textLight, cardSurface, cardText }) {
                return {
                    title: name || "Palette",
                    subtitle: name ? "Palette" : "",
                    media: surface ? (
                        <PaletteIcon
                            surface={surface}
                            text={text}
                            textLight={textLight}
                            cardSurface={cardSurface}
                            cardText={cardText}
                        />
                    ) : (
                        SunIcon
                    )
                };
            }
        },
        icon: SunIcon,
        __experimental_omnisearch_visibility: false
    });
}
