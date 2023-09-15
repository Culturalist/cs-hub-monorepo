import { defineType, defineField, SanityDocument, Slug } from '@sanity/types';
import { PresentationIcon } from '@sanity/icons';
import { filterByDocumentApp, getMediaCover, selectDefaultLocale } from '../../../utils';
import { Color, DefaultSchemaProps } from 'globals';
import { BodyBlock, CoverBlock, ElementDate, LineupPeople, LinkCaptioned, LocaleString } from '../../objects';
import { MetadataPage } from '../../sections';
import { App, Label, Theme, themeColors } from '../../system';
import { Page } from '../page';

interface SchemaProps extends DefaultSchemaProps {}

export interface Event extends SanityDocument {
    _type: 'event' | 'reference';
    _ref?: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    slug: Slug;
    app?: App;
    lineup?: LineupPeople[];
    dates?: ElementDate[];
    action?: LinkCaptioned;
    covers?: CoverBlock[];
    coverCaption?: LocaleString;
    body?: BodyBlock[];
    parent?: Page;
    labels?: Label[];
    theme?: Theme;
    cardSurface?: Color;
    metadata?: MetadataPage;
}

export default function event({ appName = 'hub' }: SchemaProps) {
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
                name: 'style',
                title: 'Style'
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
                hidden: ({ parent }) => !!parent?.app,
                readOnly: ({ parent }) => !!parent?.app
            }),
            defineField({
                name: 'lineup',
                title: 'Lineup',
                type: 'array',
                of: [{ type: 'lineupPeople' }],
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
                name: 'covers',
                title: 'Covers',
                type: 'coverArray',
                group: 'page'
            }),
            defineField({
                name: 'coverCaption',
                title: 'Cover caption',
                type: 'localeString',
                options: {
                    collapsible: true,
                    collapsed: true
                },
                group: 'page'
            }),
            defineField({
                name: 'body',
                type: 'bodyEvent',
                title: 'Body',
                group: 'page'
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
                readOnly: false,
                group: 'connections'
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
                ],
                group: 'connections'
            }),
            defineField({
                name: 'theme',
                title: 'Page theme',
                type: 'reference',
                description: 'If not set – default website theme will be used',
                to: [{ type: 'theme' }],
                group: 'style'
            }),
            defineField({
                name: 'cardSurface',
                title: 'Custom color',
                type: 'color',
                options: {
                    colorList: themeColors
                },
                group: 'style'
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
                title: 'title',
                covers: 'covers',
                parent: 'parent.title',
                label: 'labels.0.title',
                metaCover: 'metadata.sharedImage'
            },
            prepare({ title, covers, parent, label, metaCover }) {
                const localeTitle = selectDefaultLocale(title);
                const cover = getMediaCover(covers) || metaCover;
                let subtitle = 'Event';
                subtitle += selectDefaultLocale(parent) ? ' / ' + selectDefaultLocale(parent) : '';
                subtitle += selectDefaultLocale(label) ? ' / ' + selectDefaultLocale(label) : '';
                return {
                    title: localeTitle || 'Event',
                    subtitle: localeTitle ? subtitle : '',
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
