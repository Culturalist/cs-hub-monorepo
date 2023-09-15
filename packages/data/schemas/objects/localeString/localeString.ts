import { defineField, defineType } from '@sanity/types';
import { DefaultSchemaProps, Locale } from 'globals';
import globalConfig from 'globals/globalConfig';

interface SchemaProps extends DefaultSchemaProps {}

export type LocaleString = Record<Locale, string>;

export default function localeString({ appName = 'hub' }: SchemaProps) {
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
