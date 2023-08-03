export function getNestedValueById<T>(
    object: Record<string, any>,
    id: string,
    _fallback?: string,
    _divider?: string
): T | undefined {
    let value = object;
    const path = id.split(_divider || ':');
    const fallback = _fallback || 'default';
    for (const key of path) {
        if (value?.[key]) {
            value = value[key];
        }
    }
    if (value?.[fallback]) {
        value = value[fallback];
    }
    if (typeof value !== 'object') {
        return value;
    }
    return undefined;
}
