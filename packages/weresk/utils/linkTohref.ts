import { LinkTyped } from 'data/types';

export function linkToHref(link: LinkTyped | undefined): string {
    if (link) {
        if (link.type === 'external' && link.external) {
            return link.external;
        } else if (link.type === 'internal' && link.internal) {
            return link.internal;
        } else if (link.type === 'anchor' && link.anchor) {
            return `#${link.anchor}`;
        } else if (link.type === 'reference' && link.reference) {
            return link.reference.slug ? `/${link.reference.slug.current}` : '/';
        }
    }
    return '';
}
