import { Locale } from "@cs/globals";
import { globalConfig } from "@cs/globals";

export function selectDefaultLocale(input?: Record<Locale, string>): string {
    return input?.[globalConfig.localization.default] || "";
}
