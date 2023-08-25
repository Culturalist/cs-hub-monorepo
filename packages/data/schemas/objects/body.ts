import { defineType } from 'sanity';
import { capitalize } from 'weresk/utils';
import { DocumentApp } from '../values';
import { BlockSection } from './blockSection';

export type BodyBlock = BlockSection;

export default function body(parent: DocumentApp) {
    return defineType({
        name: `body${capitalize(parent)}`,
        title: 'Body',
        type: 'array',
        of: [{ type: `blockSection${capitalize(parent)}` }]
    });
}
