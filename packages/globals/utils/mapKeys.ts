export function mapKeys<K extends string, T>(
    keys: K[],
    fn: (arg: K) => T
): Record<K, T> {
    const output: Partial<Record<K, T>> = {};
    keys.forEach((key) => {
        output[key] = fn(key);
    });
    return output as Record<K, T>;
}
