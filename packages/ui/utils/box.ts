import { box as boxOriginal, boxToPx as boxToPxOriginal } from "@weresk/maket";
import type { BoxDimentions } from "@weresk/maket";
import { gridConfig } from "../maket";

export function box(d: BoxDimentions, selector?: string): BoxDimentions {
    return boxOriginal(d, selector, gridConfig);
}

export function boxToPx(d: BoxDimentions, selector?: string): BoxDimentions {
    return boxToPxOriginal(d, selector, gridConfig);
}
