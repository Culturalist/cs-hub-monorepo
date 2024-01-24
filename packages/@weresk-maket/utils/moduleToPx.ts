export function moduleToPx(n: number, module: number, gutter: number): number {
    if (!n) return 0;
    return n * module + (n - 1) * gutter;
}
