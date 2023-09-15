import { defineType, defineField, SanityDocument, Slug } from '@sanity/types';
import { TagIcon } from '@sanity/icons';
import { selectDefaultLocale } from '../../../utils';
import { LocaleString } from '../../objects';
import { DefaultSchemaProps } from 'globals';

interface SchemaProps extends DefaultSchemaProps {}

export interface Label extends SanityDocument {
    _type: 'label' | 'reference';
    _ref?: string;
    title?: LocaleString;
    slug: Slug;
}

export default function label({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'label',
        title: 'Label',
        type: 'document',
        fields: [
            defineField({
                name: 'title',
                title: 'Title',
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
                title: 'title'
            },
            prepare({ title }) {
                const localeTitle = selectDefaultLocale(title);
                return {
                    title: localeTitle || 'Label',
                    subtitle: localeTitle ? 'Label' : ''
                };
            }
        },
        icon: TagIcon,
        __experimental_omnisearch_visibility: false
    });
}
