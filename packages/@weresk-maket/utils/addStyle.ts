import merge from "lodash/merge";

export default function addStyle(
    styles: object,
    selector: string,
    props: [string, string | number][],
    screen?: string | number
) {
    const def = Object.fromEntries([[selector, Object.fromEntries(props)]]);
    merge(styles, screen ? Object.fromEntries([[`@media (min-width: ${screen})`, def]]) : def);
}
