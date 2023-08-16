import { defineType, defineField, SanityDocument, Slug } from 'sanity';
import { PresentationIcon } from '@sanity/icons';
import { BodyBlock, LocaleString, MediaBlock } from '../objects';
import { App } from '../system/app';
import { MetadataPage } from '../sections';
import { filterByDocumentApp, getMediaCover, selectDefaultLocale } from '../../utils';
import globalConfig from 'globals/globalConfig';
import { Page } from './page';
import { Label } from '../system';

export interface Event extends SanityDocument {
    _type: 'event' | 'reference';
    _ref?: string;
    title?: LocaleString;
    slug: Slug;
    app?: App;
    date: string;
    covers?: MediaBlock[];
    body?: BodyBlock[];
    parent?: Page;
    label?: Label;
    metadata?: MetadataPage;
}

export default function event(appName: string = 'hub') {
    return defineType({
        name: 'event',
        title: 'Event',
        type: 'document',
        groups: [
            {
                name: 'card',
                title: 'Card'
            },
            {
                name: 'event',
                title: 'Event'
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
                name: 'subtitle',
                title: 'Subtitle',
                type: 'localeString',
                options: {
                    collapsible: true,
                    collapsed: true
                },
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
                group: 'card',
                hidden: !globalConfig.debug,
                readOnly: !globalConfig.debug
            }),
            defineField({
                name: 'parent',
                title: 'Parent page',
                type: 'reference',
                description: 'Set a page relavent to event',
                to: [{ type: 'page' }],
                options: {
                    disableNew: true,
                    filter: ({ document }: any) => filterByDocumentApp(document)
                },
                readOnly: false, //!globalConfig.debug,
                group: 'event'
            }),
            defineField({
                name: 'lineup',
                title: 'Lineup',
                type: 'array',
                of: [{ type: 'elementLineup' }],
                group: 'event'
            }),
            defineField({
                name: 'dates',
                title: 'Dates',
                type: 'array',
                of: [{ type: 'elementDate' }],
                group: 'event'
            }),
            defineField({
                name: 'action',
                title: 'Action',
                type: 'linkCaptioned',
                group: 'event'
            }),
            defineField({
                name: 'label',
                title: 'Label',
                type: 'reference',
                description: 'Use labels for grouping the events, if necessarily',
                to: [{ type: 'label' }],
                group: 'event'
            }),
            defineField({
                name: 'covers',
                title: 'Covers',
                type: 'mediaArrayCover',
                group: 'card'
            }),
            defineField({
                name: 'body',
                type: 'bodyEvent',
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
                    title: localeTitle || 'Event',
                    subtitle: localeTitle ? 'Event' : '',
                    media: cover
                };
            }
        },
        icon: PresentationIcon,
        orderings: [
            {
                title: 'Title',
                name: 'titleAsc',
                by: [{ field: 'slug.current', direction: 'asc' }]
            }
        ]
    });
}
