import { defineField, defineType } from '@sanity/types';
import globalConfig from 'globals/globalConfig';
import { DefaultSchemaProps } from 'globals';

interface SchemaProps extends DefaultSchemaProps {}

export default function localeText({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'localeText',
        title: 'Locale Text',
        type: 'object',
        fields: globalConfig.localization.languages.map(lang =>
            defineField({
                title: lang.title,
                name: lang.id,
                type: 'text'
            })
        )
    });
}
