import { defineType, defineField, SanityDocument, Slug } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { BodyBlock, LocaleString, MediaBlock } from '../objects';
import { App } from '../system/app';
import { MetadataPage } from '../sections';
import { getMediaCover, selectDefaultLocale } from '../../utils';
import globalConfig from 'globals/globalConfig';

export interface Note extends SanityDocument {
    _type: 'note' | 'reference';
    _ref?: string;
    title?: LocaleString;
    slug: Slug;
    app?: App;
    date: string;
    covers?: MediaBlock[];
    body?: BodyBlock[];
    metadata?: MetadataPage;
}

export default function note(appName: string = 'hub') {
    return defineType({
        name: 'note',
        title: 'Note',
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
                name: 'connections',
                title: 'Connections'
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
                name: 'date',
                title: 'Date',
                type: 'datetime',
                initialValue: new Date().toISOString(),
                validation: Rule => Rule.required(),
                group: 'card'
            }),
            defineField({
                name: 'app',
                title: 'App',
                type: 'reference',
                to: [{ type: 'app' }],
                group: 'card',
                hidden: !globalConfig.debug,
                readOnly: !globalConfig.debug
            }),
            defineField({
                name: 'covers',
                title: 'Covers',
                type: 'mediaArrayCover',
                group: 'card'
            }),
            defineField({
                name: 'body',
                type: 'bodyNote',
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
                covers: 'covers',
                metaCover: 'metadata.sharedImage'
            },
            prepare({ appName, title, covers, metaCover }) {
                const localeTitle = selectDefaultLocale(title, appName);
                const cover = getMediaCover(covers) || metaCover;
                return {
                    title: localeTitle || 'Note',
                    subtitle: localeTitle ? 'Note' : '',
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
