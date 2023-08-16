import { defineField, defineType } from 'sanity';
import { Locale } from 'globals';
import globalConfig from 'globals/globalConfig';
import { hideLanguageField } from '../../utils';

export type LocaleString = Record<Locale, string>;

export default function localeString() {
    return defineType({
        name: 'localeString',
        title: 'Locale String',
        type: 'object',
        fields: [
            ...globalConfig.localization.languages.map(lang =>
                defineField({
                    title: lang.title,
                    name: lang.id,
                    type: 'string',
                    hidden: ({ document }: any) => hideLanguageField(lang.id, document)
                })
            )
        ]
    });
}