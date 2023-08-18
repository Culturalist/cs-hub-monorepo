import { Locale } from 'globals';
import globalConfig from 'globals/globalConfig';
import { LinkTyped, PageDocument } from '../schemas';

export function prepareLink(input: LinkTyped, lang?: Locale): string {
    const { type, anchor, external, internal, reference, file } = input;
    let link = '';

    if (type == 'external' && external) {
        link = external;
    } else if (type == 'anchor' && anchor) {
        link = anchor.startsWith('#') ? anchor : `#${anchor}`;
    } else if (type == 'file' && file?.url) {
        link = file.url;
    } else if (type == 'internal' && internal) {
        link =
            internal.startsWith('/') || internal.startsWith('?') || internal.startsWith('#')
                ? internal
                : `/${internal}`;
        link = lang && internal.startsWith('/') ? `/${lang}${link}` : link;
    } else if (type == 'reference' && reference) {
        if (reference._type !== 'reference') {
            link = `${globalConfig.routes[reference._type] ? '/' + globalConfig.routes[reference._type] : ''}/${
                reference.slug.current
            }`;
            link = lang ? `/${lang}${link}` : link;
        }
    }

    link = link
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .replace(/\s+/g, '-');

    return link;
}

export function wrapReference(doc: PageDocument): LinkTyped {
    return {
        _type: 'linkTyped',
        type: 'reference',
        reference: doc
    };
}
