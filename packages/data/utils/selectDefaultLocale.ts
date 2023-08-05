import { Locale } from 'globals';
import globalConfig from 'globals/globalConfig';

export default function selectDefaultLocale(input?: Record<Locale, string>, appName: string = 'hub'): string {
    return input?.[globalConfig.apps[appName.replace('drafts.', '')].localization.default] || '';
}
