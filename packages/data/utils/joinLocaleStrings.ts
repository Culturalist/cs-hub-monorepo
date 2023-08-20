import { LocaleString } from '../schemas';
import selectDefaultLocale from './selectDefaultLocale';

export function joinLocaleStrings(input: LocaleString[], appName: string = 'hub'): string {
    if (input.length == 0) return '';
    let output = selectDefaultLocale(input[0], appName);
    for (let i = 1; i < input.length; i++) {
        !!selectDefaultLocale(input[i], appName) && (output += ', ' + selectDefaultLocale(input[i], appName));
    }
    return output;
}
