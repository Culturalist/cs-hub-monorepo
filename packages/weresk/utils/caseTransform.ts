export type StringCase = 'capitalize' | 'uppercase' | 'lowercase' | 'title';

export function caseTransform(input: string, transform: StringCase): string {
    if (transform === 'uppercase') {
        return input.toUpperCase();
    } else if (transform === 'lowercase') {
        return input.toLowerCase();
    } else if (transform === 'capitalize') {
        return input.charAt(0).toUpperCase() + input.slice(1);
    } else if (transform === 'title') {
        return input
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    return '';
}

export function capitalize(input: string): string {
    return caseTransform(input, 'capitalize');
}

export function title(input: string): string {
    return caseTransform(input, 'title');
}
