// import merge from "lodash.merge";

import { mergeDeep } from "@weresk/core";

export function numeric(input: number | string): number {
    if (typeof input === "number") {
        return input;
    }
    return parseFloat(input);
}

export function addStyle(
    styles: object,
    selector: string,
    props: [string, string | number][],
    screen?: string | number
) {
    const def = Object.fromEntries([[selector, Object.fromEntries(props)]]);
    const merged = mergeDeep(styles, screen ? Object.fromEntries([[`@media (min-width: ${screen})`, def]]) : def);
    // merge(styles, screen ? Object.fromEntries([[`@media (min-width: ${screen})`, def]]) : def);
}

export function sortStyles(styles: object): object {
    return Object.fromEntries(
        Object.entries(styles).sort((a, b) => {
            const firstCompare = a[0].charAt(0).localeCompare(b[0].charAt(0));
            if (!firstCompare) {
                const isDigit = /\d+/g;
                const aNum = a[0].match(isDigit)?.[0];
                const bNum = b[0].match(isDigit)?.[0];
                if (aNum && bNum) {
                    return parseInt(aNum) - parseInt(bNum);
                }
            }
            return firstCompare;
        })
    );
}
