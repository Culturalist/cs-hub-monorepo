import globalConfig from 'globals/globalConfig';

export function localizeString(input: string | Record<string, string> | undefined, lang: string | undefined): string {
    let output: string = '';
    if (typeof input === 'string') {
        //If input is string, return input
        output = input;
    } else if (lang && input?.[lang]) {
        //If input and language are provided and value is not empty
        output = input[lang];
    } else if (globalConfig.localization.safeReplace) {
        //If safeReplace is turned on in config, replace empty value with value from default locale
        output = input?.[globalConfig.localization.default] || '';
    }
    return output;
}
