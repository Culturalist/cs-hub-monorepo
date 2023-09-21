import { defineType, defineField } from '@sanity/types';
import { globalConfig, Locale } from 'globals';

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
                    type: 'string'
                })
            )
        ]
    });
}
