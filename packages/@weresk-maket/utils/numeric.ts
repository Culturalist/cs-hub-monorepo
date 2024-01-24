export default function numeric(input: number | string | undefined): number {
    if (!input) return 0;
    if (typeof input === "number") {
        return input;
    }
    return parseFloat(input) || 0;
}
