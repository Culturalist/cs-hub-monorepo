import { Locale } from 'globals';
import { globalConfig } from 'globals';

export function selectDefaultLocale(input?: Record<Locale, string>): string {
    return input?.[globalConfig.localization.default] || '';
}
