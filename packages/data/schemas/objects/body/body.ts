import { defineType } from '@sanity/types';
import { capitalize } from 'globals/utils';
import { BlockSection } from '../blockSection';
import { DocumentApp } from 'globals';

interface SchemaProps {
    parent: DocumentApp;
}

export type BodyBlock = BlockSection;

export default function body({ parent }: SchemaProps) {
    return defineType({
        name: `body${capitalize(parent)}`,
        title: 'Body',
        type: 'array',
        of: [{ type: `blockSection${capitalize(parent)}` }]
    });
}
