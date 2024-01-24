import numeric from "./numeric";

export default function cssValue(input: number | string, units?: string): string {
    return `${numeric(input)}${units || ""}`;
}
