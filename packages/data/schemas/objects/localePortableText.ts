import { defineField, defineType } from 'sanity';
import globalConfig from 'globals/globalConfig';
import { hideLanguageField } from '../../utils';
import { capitalize } from 'weresk/utils';
import { BlockParent } from '../values';
import { PortableTextBlock } from './portableText';
import { Locale } from 'globals';

export type LocalePortableText = Record<Locale, PortableTextBlock>;

export default function localePortableText(parent: BlockParent) {
    return defineType({
        name: `localePortableText${capitalize(parent)}`,
        title: 'Locale Text',
        type: 'object',
        fields: globalConfig.localization.languages.map(lang =>
            defineField({
                title: lang.title,
                name: lang.id,
                type: `portableText${capitalize(parent)}`,
                hidden: ({ document }: any) => hideLanguageField(lang.id, document)
            })
        )
    });
}
