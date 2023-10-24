import { globalConfig } from "@cs/globals";
import type { Locale } from "@cs/globals";

export function selectDefaultLocale(input?: Record<Locale, string>): string {
    return input?.[globalConfig.localization.default] || "";
}
