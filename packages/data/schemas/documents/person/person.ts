import { defineType, defineField, SanityDocument, Slug } from '@sanity/types';
import { UserIcon } from '@sanity/icons';
import { joinLocaleStrings, selectDefaultLocale } from '../../../utils';
import { LinkContact, LocalePortableText, LocaleString } from '../../objects';
import { Label } from '../../system';
import { globalConfig, ImageObject } from 'globals';
import { Page } from '../page';

export interface Person extends SanityDocument {
    _type: 'person' | 'reference';
    _ref?: string;
    title?: LocaleString;
    slug: Slug;
    photo?: ImageObject;
    photoCaption?: LocaleString;
    subtitle?: LocaleString;
    contacts?: LinkContact[];
    description?: LocalePortableText;
    labels?: Label[];
    parent?: Page;
}

export default function person() {
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
                name: 'slug',
                type: 'normalizedSlug',
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'photo',
                title: 'Photo',
                type: 'image',
                options: {
                    hotspot: true
                }
            }),
            defineField({
                name: 'photoCaption',
                title: 'Photo caption',
                type: 'localeString',
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }),
            defineField({
                name: 'subtitle',
                title: 'Subtitle',
                type: 'localeString'
            }),
            defineField({
                name: 'contacts',
                title: 'Contacts',
                type: 'array',
                of: [{ type: 'linkContact' }]
            }),
            defineField({
                name: 'description',
                title: 'Description',
                type: 'localePortableTextField'
            }),
            defineField({
                name: 'labels',
                title: 'Labels',
                type: 'array',
                description: 'Use labels for grouping, if necessarily',
                of: [
                    {
                        type: 'reference',
                        title: 'Label',
                        to: [{ type: 'label' }]
                    }
                ]
            })
        ],
        preview: {
            select: {
                name: 'title',
                photo: 'photo',
                label1: 'labels.0.title',
                label2: 'labels.1.title',
                label3: 'labels.2.title'
            },
            prepare({ name, photo, label1, label2, label3 }) {
                const localeName = selectDefaultLocale(name);
                const labels = joinLocaleStrings([label1, label2, label3]);
                return {
                    title: localeName || 'Person',
                    subtitle: localeName ? labels : '',
                    media: photo
                };
            }
        },
        icon: UserIcon,
        orderings: [
            {
                title: 'Name',
                name: 'titleAsc',
                by: [{ field: `title.${globalConfig.localization.default}`, direction: 'asc' }]
            }
        ]
    });
}
