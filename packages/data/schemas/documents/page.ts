import { defineType, defineField, SanityDocument, Slug } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { LocaleString } from '../objects/localeString';
import { App } from '../system/app';
import { MetadataPage } from '../objects/metadataPage';
import { selectDefaultLocale } from '../../utils';

export interface Page extends SanityDocument {
    _type: 'page' | 'reference';
    _ref?: string;
    title?: LocaleString;
    slug: Slug;
    app?: App;
    metadata?: MetadataPage;
}

export default function page(appName: string = 'hub') {
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
                name: 'body',
                type: 'bodyPage',
                title: 'Body',
                group: 'page'
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
                appName: 'app._ref',
                title: 'title',
                cover: 'metadata.sharedImage'
            },
            prepare({ appName, title, cover }) {
                const localeTitle = selectDefaultLocale(title, appName);
                return {
                    title: localeTitle || 'Page',
                    subtitle: localeTitle ? 'Page' : '',
                    media: cover
                };
            }
        },
        icon: DocumentIcon,
        orderings: [
            {
                title: 'Title',
                name: 'titleAsc',
                by: [{ field: 'slug.current', direction: 'asc' }]
            }
        ]
    });
}
