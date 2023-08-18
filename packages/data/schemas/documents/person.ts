import { defineType, defineField, SanityDocument, Slug } from 'sanity';
import { UserIcon } from '@sanity/icons';
import { selectDefaultLocale } from '../../utils';
import { LocaleString } from '../objects';

export interface Person extends SanityDocument {
    _type: 'person' | 'reference';
    _ref?: string;
    title?: LocaleString;
    position?: LocaleString;
    slug: Slug;
}

export default function person(appName: string = 'hub') {
    return defineType({
        name: 'person',
        title: 'Person',
        type: 'document',
        fields: [
            defineField({
                name: 'title',
                title: 'Name',
                type: 'localeString'
            }),
            defineField({
                name: 'position',
                title: 'Position',
                type: 'localeString'
            }),
            defineField({
                name: 'slug',
                type: 'normalizedSlug',
                validation: Rule => Rule.required()
            })
        ],
        preview: {
            select: {
                name: 'title',
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
