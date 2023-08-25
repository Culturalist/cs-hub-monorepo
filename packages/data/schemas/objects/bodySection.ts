import { defineType } from 'sanity';
import { capitalize } from 'weresk/utils';
import { DocumentApp } from '../values';
import { BlockCards } from './blockCards';
import { BlockLinks } from './blockLinks';

export type BodySectionBlock = BlockLinks | BlockCards;

export default function bodySection(parent: DocumentApp) {
    return defineType({
        name: `bodySection${capitalize(parent)}`,
        title: 'Content',
        type: 'array',
        of: [{ type: 'blockCards' }, { type: 'blockLinks' }]
    });
}
