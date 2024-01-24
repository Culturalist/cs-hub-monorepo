import numeric from "./numeric";

export default function sortScreens(
    input?: Record<string, string | number> | [string, string | number][]
): [string, string | number][] {
    if (!input) return [];
    const screens = Array.isArray(input) ? [...input] : Object.entries(input);
    return screens.sort((a, b) => numeric(a[1]) - numeric(b[1]));
}
