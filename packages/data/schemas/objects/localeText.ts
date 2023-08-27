import { defineField, defineType } from 'sanity';
import globalConfig from 'globals/globalConfig';

export default function localeText() {
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
