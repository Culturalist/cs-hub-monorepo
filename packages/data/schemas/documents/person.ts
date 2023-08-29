import { defineType, defineField, SanityDocument, Slug } from 'sanity';
import { UserIcon } from '@sanity/icons';
import { joinLocaleStrings, selectDefaultLocale } from '../../utils';
import { LinkContact, LocalePortableText, LocaleString } from '../objects';
import globalConfig from 'globals/globalConfig';
import { App, Label } from '../system';
import { ImageObject } from 'globals';

export interface Person extends SanityDocument {
    _type: 'person' | 'reference';
    _ref?: string;
    title?: LocaleString;
    slug: Slug;
    app?: App;
    photo?: ImageObject;
    position?: LocaleString;
    contacts?: LinkContact[];
    description?: LocalePortableText;
    labels?: Label[];
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
                name: 'slug',
                type: 'normalizedSlug',
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'app',
                title: 'App',
                type: 'reference',
                to: [{ type: 'app' }],
                hidden: !globalConfig.debug,
                readOnly: !globalConfig.debug
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
                name: 'position',
                title: 'Position',
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
