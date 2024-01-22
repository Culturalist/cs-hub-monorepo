export function numeric(input: number | string | undefined): number {
    if (typeof input === "number") {
        return input;
    }
    return input ? parseFloat(input) : 0;
}
