export const defaultColorNames = ["surface", "on_surface", "on_surface_light", "primary", "on_primary"] as const;
export type DefaultColorName = (typeof defaultColorNames)[number];

export const paletteTypeFields = ["_id", "_type", "_createdAt", "_updatedAt", "_rev", "_ref", "name"];

export const defaultSwatches = [
    "#323232", //Black 900
    "#999999", //Grey
    "#FFFFFF" //White
];

export interface PaletteField {
    name: string;
    title: string;
    description?: string;
}

export const defaultFields: PaletteField[] = [
    {
        name: "surface",
        title: "Surface",
        description: "Background color"
    },
    {
        name: "on_surface",
        title: "On Surface",
        description: "Color for text and elements with most contrast"
    },
    {
        name: "on_surface_light",
        title: "On Surface Light",
        description: "Color for lighter text and elements with less contrast"
    },
    {
        name: "primary",
        title: "Primary",
        description: "Color for accent elements, buttons, hover states, etc."
    },
    {
        name: "on_primary",
        title: "On Primary",
        description: "Color for text on accent surfaces"
    }
];
