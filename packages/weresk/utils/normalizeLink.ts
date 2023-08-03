export type InternalPrefix = '/' | '#' | '?';
export type ExternalPrefix = 'http://' | 'https://' | 'mailto:';
export type InternalLink = `${InternalPrefix}${string}`;
export type ExternalLink = `${ExternalPrefix}${string}`;
export type NormalizedLink = InternalLink | ExternalLink;
export type LinkType = 'internal' | 'external' | 'anchor';

export function normalizeLink(input: string | undefined): [NormalizedLink, LinkType] {
    let linkType: LinkType = 'anchor';
    let prefix: InternalPrefix | ExternalPrefix = '#';
    let link = '';

    if (input) {
        if (input.startsWith('#')) {
            link = input.substring(1);
        } else if (input.startsWith('/')) {
            prefix = '/';
            link = input.substring(1);
            linkType = 'internal';
        } else if (input.startsWith('?')) {
            prefix = '?';
            link = input.substring(1);
            linkType = 'internal';
        } else if (input.startsWith('mailto:') || input.includes('@')) {
            prefix = 'mailto:';
            link = input.startsWith('mailto:') ? input.substring(7) : input;
            linkType = 'external';
        } else if (input.startsWith('https://')) {
            prefix = 'https://';
            link = input.substring(8);
            linkType = 'external';
        } else if (input.startsWith('http://')) {
            prefix = 'http://';
            link = input.substring(7);
            linkType = 'external';
        } else if (input.includes('/') || input.includes('.') || input.includes(':')) {
            prefix = 'http://';
            link = input;
            linkType = 'external';
        } else {
            link = input;
        }

        link = link
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .trim()
            .replace(/\s+/g, '-');
        link = linkType !== 'external' ? link.toLowerCase() : link;
    }

    return [`${prefix}${link}`, linkType];
}
