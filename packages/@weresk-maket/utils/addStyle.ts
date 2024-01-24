import { mergeDeep } from "@weresk/core";

export default function addStyle(
    styles: object,
    selector: string,
    props: [string, string | number][],
    screen?: string | number
) {
    const def = Object.fromEntries([[selector, Object.fromEntries(props)]]);
    const merged = mergeDeep(styles, screen ? Object.fromEntries([[`@media (min-width: ${screen})`, def]]) : def);
    // merge(styles, screen ? Object.fromEntries([[`@media (min-width: ${screen})`, def]]) : def);
}
