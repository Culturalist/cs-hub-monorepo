import { objectMap } from "./objectMap";

export function purgeEmptyStrings(obj: object) {
    // eslint-disable-next-line
    return objectMap(obj, (value: any) => (value !== "" ? value : null));
}
