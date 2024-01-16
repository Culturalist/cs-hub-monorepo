import { globalConfig } from "@cs/globals";

export function selectLocale<T extends object>(
    input: Record<string, T> | undefined,
    lang: string | undefined
): T | undefined {
    if (lang) {
        if (input?.[lang]) {
            return input[lang];
        } else if (globalConfig.localization.safeReplace) {
            return input?.[globalConfig.localization.default];
        }
    }
    return undefined;
}
