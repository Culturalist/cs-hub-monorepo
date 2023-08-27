import { defineField, defineType } from 'sanity';
import globalConfig from 'globals/globalConfig';
import { capitalize } from 'weresk/utils';
import { BlockParent } from '../values';
import { PortableTextBlock } from './portableText';
import { Locale } from 'globals';
import { BlockquoteIcon } from '@sanity/icons';

export type LocalePortableText = Record<Locale, PortableTextBlock> & {
    _type: `localePortableText${Capitalize<BlockParent>}`;
    typeClass: 'blockText';
};

export default function localePortableText(parent: BlockParent, appName: string = 'hub') {
    return defineType({
        name: `localePortableText${capitalize(parent)}`,
        title: 'Text',
        type: 'object',
        fields: [
            ...globalConfig.localization.languages.map(lang =>
                defineField({
                    title: lang.title,
                    name: lang.id,
                    type: `portableText${capitalize(parent)}`
                })
            ),
            defineField({
                name: 'typeClass',
                title: 'Class',
                type: 'string',
                initialValue: 'blockText',
                hidden: true,
                readOnly: true
            })
        ],
        preview: {
            select: {
                content: globalConfig.localization.default
            },
            prepare({ content }) {
                const title = content && content[0]._type === 'block' ? content[0].children[0].text : null;
                return {
                    title: title || 'Text',
                    subtitle: title ? 'Text' : ''
                };
            }
        },
        icon: BlockquoteIcon
    });
}
