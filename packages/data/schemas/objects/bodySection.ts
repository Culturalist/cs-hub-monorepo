import { defineType } from 'sanity';
import { capitalize } from 'weresk/utils';
import { bodyBlockDefinitions, DocumentApp } from '../values';
import { BlockCards } from './blockCards';
import { BlockColumns } from './blockColumns';
import { BlockLinks } from './blockLinks';
import { LocalePortableText } from './localePortableText';

export type BodySectionBlock = LocalePortableText | BlockColumns | BlockLinks | BlockCards;

export default function bodySection(parent: DocumentApp) {
    return defineType({
        name: `bodySection${capitalize(parent)}`,
        title: 'Content',
        type: 'array',
        of: [
            { type: 'localePortableTextBody' },
            { type: 'blockColumns' },
            { type: 'blockLinks' },
            { type: 'blockCards' },
            { type: 'blockSchedule' }
        ].filter(field => (bodyBlockDefinitions[parent] ? bodyBlockDefinitions[parent]?.includes(field.type) : true))
    });
}
