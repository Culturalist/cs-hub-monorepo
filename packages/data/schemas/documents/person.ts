import { defineType, defineField, SanityDocument } from 'sanity';
import { UserIcon } from '@sanity/icons';
import { Locale } from 'globals';
import globalConfig from 'globals/globalConfig';

export interface Person extends SanityDocument {
    _type: 'person' | 'reference';
    _ref?: string;
}

export default function person(appDefaultLanguage: Locale = globalConfig.localization.default) {
    return defineType({
        name: 'person',
        title: 'Person',
        type: 'document',
        fields: [
            defineField({
                name: 'name',
                title: 'Name',
                type: 'localeString'
            }),
            defineField({
                name: 'position',
                title: 'Position',
                type: 'string'
            })
        ],
        preview: {
            select: {
                title: `name.${appDefaultLanguage}`,
                subtitle: 'position'
            }
        },
        icon: UserIcon
    });
}
