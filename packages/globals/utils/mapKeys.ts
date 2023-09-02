export function mapKeys<K extends string, T>(keys: K[], fn: Function): Record<K, T> {
    const output: Partial<Record<K, T>> = {};
    keys.forEach(key => {
        output[key] = fn(key);
    });
    return output as Record<K, T>;
}
