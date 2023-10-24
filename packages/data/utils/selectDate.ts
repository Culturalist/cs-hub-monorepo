import { Locale } from "@cs/globals";
import { ElementDate } from "../schemas";

export function elementToDate(element: ElementDate): Date {
    return new Date(`${element.date}T${element.start?.padStart(5, "0")}:00`);
}

export function formatLocaleDate(input?: string, locale: Locale = "fi", full = false): string {
    if (!input) return "";
    return new Date(input).toLocaleString(`${locale}-${locale.toUpperCase()}`, {
        month: "numeric",
        day: "numeric",
        year: full ? "numeric" : undefined
    });
}

export function selectDate(input: ElementDate[], mode: "min" | "max"): ElementDate | undefined {
    if (input.length > 0) {
        let minMax = elementToDate(input[0]);
        let index = 0;
        for (let i = 1; i < input.length; i++) {
            const nextDate = elementToDate(input[i]);
            if ((mode === "min" && nextDate < minMax) || (mode === "max" && nextDate > minMax)) {
                minMax = nextDate;
                index = i;
            }
        }
        return input[index];
    }
    return undefined;
}
