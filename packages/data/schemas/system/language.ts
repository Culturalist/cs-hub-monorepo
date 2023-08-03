import { defineType, defineField, SanityDocument } from 'sanity';
import { EarthGlobeIcon } from '@sanity/icons';
import { Locale } from 'globals';

export interface Language extends SanityDocument {
    _type: 'language' | 'reference';
    _ref?: string;
    id: Locale;
    title?: string;
}

const language = defineType({
    name: 'language',
    title: 'Language',
    type: 'document',
    fields: [
        defineField({
            name: 'id',
            title: 'ID',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string'
        })
    ],
    preview: {
        select: {
            title: 'title'
        },
        prepare({ title }) {
            return {
                title: title ? title : 'Language'
            };
        }
    },
    icon: EarthGlobeIcon
});

export default language;
