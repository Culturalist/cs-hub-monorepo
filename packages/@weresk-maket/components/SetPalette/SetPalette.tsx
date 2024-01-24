import { colorToRGB } from "@weresk/core";
import { paletteTypeFields } from "../../schemas";
import type { Palette } from "../../schemas";

interface SetPaletteProps {
    selector?: string;
    set?: Palette;
    children?: string;
}

export default function SetPalette({ set, selector = ":root", children }: SetPaletteProps) {
    if (set || children) {
        const variables: string[] = [];
        set &&
            Object.entries(set).forEach(([key, value]) => {
                if (!paletteTypeFields.includes(key) && typeof value !== "string") {
                    variables.push(`--palette-${key.replace("_", "-")}: ${colorToRGB(value)}`);
                }
            });
        const styles = set ? `${selector} {${variables.join("; ")}} ` : "";
        return <style>{`${styles}${children ? children : ""}`}</style>;
    }
    return null;
}
