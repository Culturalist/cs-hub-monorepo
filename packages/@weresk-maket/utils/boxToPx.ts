import { BoxDimentions, GridConfig } from "../types";
import numeric from "./numeric";
import sortScreens from "./sortScreens";

export function boxToPx(box: BoxDimentions, selector: string | undefined, config: GridConfig): BoxDimentions {
    const s = selector || "DEFAULT";
    const screens = sortScreens(config.screens).map((screen) => screen[0]);
    screens.unshift("DEFAULT");
    let pd = 1;
    for (let i = screens.indexOf(s); i >= 0; i--) {
        if (pd <= 1) {
            pd = numeric(config.pd?.[screens[i]]);
        }
    }
    return [box[0] * pd, box[1] * pd];
}
