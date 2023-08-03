import { defineType, defineField, SanityDocument, Slug } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { Locale } from 'globals';
import globalConfig from 'globals/globalConfig';
import { LocaleString } from '../locales/localeString';
import { App } from '../system/app';
import { MetadataPage } from '../objects/metadataPage';

export interface Page extends SanityDocument {
    _type: 'page' | 'reference';
    _ref?: string;
    title?: LocaleString;
    slug: Slug;
    app?: App;
    metadata?: MetadataPage;
}

export default function page(appDefaultLanguage: Locale = globalConfig.localization.default) {
    return defineType({
        name: 'page',
        title: 'Page',
        type: 'document',
        groups: [
            {
                name: 'card',
                title: 'Card'
            },
            {
                name: 'page',
                title: 'Page'
            },
            {
                name: 'seo',
                title: 'SEO'
            }
        ],
        fields: [
            defineField({
                name: 'title',
                title: 'Title',
                type: 'localeString',
                group: 'card'
            }),
            defineField({
                name: 'slug',
                type: 'normalizedSlug',
                options: {
                    source: `title.${appDefaultLanguage}`
                },
                validation: Rule => Rule.required(),
                group: 'card'
            }),
            defineField({
                name: 'app',
                title: 'App',
                type: 'reference',
                to: [{ type: 'app' }],
                group: 'card'
            }),
            defineField({
                name: 'metadata',
                title: 'Metadata',
                type: 'metadataPage',
                group: 'seo',
                options: {
                    collapsed: true
                }
            })
        ],
        preview: {
            select: {
                title: `title.${appDefaultLanguage}`,
                channel: 'channel.title',
                cover: 'metadata.sharedImage'
            },
            prepare({ title, channel, cover }) {
                return {
                    title: title || 'Page',
                    subtitle: `${title ? 'Page' : ''}${title && channel ? ' | ' : ''}${channel || ''}`,
                    media: cover
                };
            }
        },
        icon: DocumentIcon,
        orderings: [
            {
                title: 'Title',
                name: 'titleAsc',
                by: [{ field: `title.${appDefaultLanguage}`, direction: 'asc' }]
            }
        ]
    });
}
