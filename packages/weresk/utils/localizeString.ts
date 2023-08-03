export function localizeString(input: string | Record<string, string> | undefined, lang: string | undefined): string {
    let output: string = '';
    if (typeof input === 'string') {
        output = input;
    } else if (lang && input?.[lang]) {
        output = input[lang];
    }
    return output;
}
