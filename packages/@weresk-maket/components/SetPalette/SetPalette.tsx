import { colorToRGB } from "@weresk/core";
import { paletteTypeFields, type  Palette } from "../../schemas";

interface SetPaletteProps {
    selector?: string;
    set?: Palette;
    children?: string;
}

export default function SetPalette({ set, selector = ":root", children }: SetPaletteProps) {
    if (set) {
        const variables: string[] = [];
        Object.entries(set).forEach(([key, value]) => {
            if (!paletteTypeFields.includes(key) && typeof value !== "string") {
                variables.push(`--palette-${key.replace("_", "-")}: ${colorToRGB(value)}`);
            }
        });
        return <style>{`${selector} {${variables.join("; ")}} ${children ? children : ""}`}</style>;
    }
    return null;
}
