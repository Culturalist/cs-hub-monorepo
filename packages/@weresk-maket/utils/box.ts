import { BoxDimentions, GridConfig } from "../types";
import { moduleToPx } from "./moduleToPx";
import numeric from "./numeric";
import sortScreens from "./sortScreens";

export function box(d: BoxDimentions, selector: string | undefined, config: GridConfig): BoxDimentions {
    const s = selector || "DEFAULT";
    const screens = sortScreens(config.screens).map((screen) => screen[0]);
    screens.unshift("DEFAULT");
    let module = 0;
    let gutter = 0;
    for (let i = screens.indexOf(s); i >= 0; i--) {
        if (!module) {
            module = numeric(config.grid?.module[screens[i]]);
        }
        if (!gutter) {
            gutter = numeric(config.grid?.gutter[screens[i]]);
        }
    }
    return [moduleToPx(d[0], module, gutter), moduleToPx(d[1], module, gutter)];
}
