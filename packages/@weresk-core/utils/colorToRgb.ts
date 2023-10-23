import { Color } from "../types";

export function colorToRGB(color: Color): string {
    return `${color.rgb.r} ${color.rgb.g} ${color.rgb.b}`;
}
