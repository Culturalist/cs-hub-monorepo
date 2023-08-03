import { routes } from 'data/lists';

export function typedLinkPreview(linkType: string, link: string, refType?: string): string {
    if (linkType === 'external' || linkType === 'internal') {
        return link;
    } else if (linkType === 'reference' && refType) {
        return link; //`${routes[refType] ? '/' + routes[refType] : ''}/${link}`;
    } else if (linkType === 'anchor') {
        return `#${link}`;
    }
    return '';
}
