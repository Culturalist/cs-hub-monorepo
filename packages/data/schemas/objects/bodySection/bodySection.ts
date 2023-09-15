import { defineType } from '@sanity/types';
import { capitalize } from 'globals/utils';
import { bodyBlockDefinitions } from './bodySection.values';
import { BlockCards } from '../blockCards/blockCards';
import { BlockColumns } from '../blockColumns';
import { BlockLinks } from '../blockLinks/blockLinks';
import { BlockSchedule } from '../blockSchedule';
import { LocalePortableText } from '../localePortableText';
import { BlockMedia } from '../blockMedia';
import { DefaultSchemaProps } from 'globals';
import { DocumentApp } from '../../documents';

interface SchemaProps extends DefaultSchemaProps {
    parent: DocumentApp;
}

export type BodySectionBlock = LocalePortableText | BlockColumns | BlockMedia | BlockLinks | BlockCards | BlockSchedule;

export default function bodySection({ parent, appName }: SchemaProps) {
    return defineType({
        name: `bodySection${capitalize(parent)}`,
        title: 'Content',
        type: 'array',
        of: [
            { type: 'localePortableTextBody' },
            { type: 'blockColumns' },
            { type: 'blockMedia' },
            { type: 'blockLinks' },
            { type: 'blockCards' },
            { type: 'blockSchedule' }
        ].filter(field => (bodyBlockDefinitions[parent] ? bodyBlockDefinitions[parent]?.includes(field.type) : true))
    });
}
