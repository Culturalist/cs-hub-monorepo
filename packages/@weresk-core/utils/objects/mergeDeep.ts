export function isObject(item?: any): boolean {
    return Boolean(item) && typeof item === "object" && !Array.isArray(item);
}

export function mergeDeep(target: object, ...sources: object[]): object {
    if (!sources.length) return target;
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        const _source = source as Record<string, any>;
        const _target = target as Record<string, any>;
        for (const key in _source) {
            if (isObject(_source[key])) {
                if (!_target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(_target[key], _source[key]);
            } else {
                Object.assign(target, { [key]: _source[key] });
            }
        }
    }
    return mergeDeep(target, ...sources);
}
