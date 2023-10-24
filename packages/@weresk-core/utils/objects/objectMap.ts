// eslint-disable-next-line
export function objectMap(obj: object, fn: Function) {
    return Object.fromEntries(
        Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)])
    );
}
