export type StringCase = "capitalize" | "uppercase" | "lowercase" | "title";

export function caseTransform(input: string | undefined, transform: StringCase): string {
    if (!input) return "";
    if (transform === "uppercase") {
        return input.toUpperCase();
    } else if (transform === "lowercase") {
        return input.toLowerCase();
    } else if (transform === "capitalize") {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }
    return input
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export function capitalize(input: string | undefined): string {
    return caseTransform(input, "capitalize");
}

export function title(input: string | undefined): string {
    return caseTransform(input, "title");
}
