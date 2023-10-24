import { LocaleString } from "../schemas";
import { selectDefaultLocale } from "./selectDefaultLocale";

export function joinLocaleStrings(input: LocaleString[]): string {
    if (input.length === 0) return "";
    let output = selectDefaultLocale(input[0]);
    for (let i = 1; i < input.length; i++) {
        Boolean(selectDefaultLocale(input[i])) && (output += ", " + selectDefaultLocale(input[i]));
    }
    return output;
}
