import { defineType } from '@sanity/types';
import { capitalize } from 'globals/utils';
import { BlockSection } from '../blockSection';
import { DefaultSchemaProps } from 'globals';
import { DocumentApp } from '../../documents';

interface SchemaProps extends DefaultSchemaProps {
    parent: DocumentApp;
}

export type BodyBlock = BlockSection;

export default function body({ parent, appName = 'hub' }: SchemaProps) {
    return defineType({
        name: `body${capitalize(parent)}`,
        title: 'Body',
        type: 'array',
        of: [{ type: `blockSection${capitalize(parent)}` }]
    });
}
