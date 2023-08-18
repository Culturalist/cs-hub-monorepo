import { objectMap } from './objectMap';

export function purgeEmptyStrings(obj: object) {
    return objectMap(obj, (value: any) => (value !== '' ? value : null));
}
