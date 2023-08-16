import { defineType, Slug } from 'sanity';
import { capitalize } from 'weresk/utils';
import { DocumentAny } from '../values';
import { BlockCards } from './blockCards';
import { BlockSection } from './blockSection';
import { LocaleString } from './localeString';

export interface BlockWithId {
    _key: string;
    title?: LocaleString;
    blockId?: Slug;
}

export type BodyBlock = BlockSection | BlockCards;

export default function body(parent: DocumentAny) {
    return defineType({
        name: `body${capitalize(parent)}`,
        title: 'Body',
        type: 'array',
        of: [{ type: 'blockSection' }, { type: 'blockCards' }]
    });
}
