import { defineType, defineField, SanityDocument } from 'sanity';
import { UserIcon } from '@sanity/icons';
import globalConfig from 'globals/globalConfig';
import { selectDefaultLocale } from '../../utils';

export interface Person extends SanityDocument {
    _type: 'person' | 'reference';
    _ref?: string;
}

export default function person(appName: string = 'hub') {
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
                type: 'localeString'
            })
        ],
        preview: {
            select: {
                name: 'name',
                position: 'position'
            },
            prepare({ name, position }) {
                const localeName = selectDefaultLocale(name, appName);
                const localePosition = selectDefaultLocale(position, appName);
                return {
                    title: localeName || 'Person',
                    subtitle: localeName ? localePosition : ''
                };
            }
        },
        icon: UserIcon
    });
}
