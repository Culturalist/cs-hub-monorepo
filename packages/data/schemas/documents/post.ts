import { defineType, defineField, SanityDocument, Slug } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { BodyBlock, CoverBlock, LocaleString } from '../objects';
import { App } from '../system/app';
import { MetadataPage } from '../sections';
import { filterByDocumentApp, getMediaCover, selectDefaultLocale } from '../../utils';
import globalConfig from 'globals/globalConfig';
import { Person } from './person';
import { Page } from './page';
import { Label } from '../system';

export interface Post extends SanityDocument {
    _type: 'post' | 'reference';
    _ref?: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    slug: Slug;
    app?: App;
    date: string;
    covers?: CoverBlock[];
    coverCaption?: LocaleString;
    body?: BodyBlock[];
    author?: Person;
    parent?: Page;
    labels?: Label[];
    metadata?: MetadataPage;
}

export default function post(appName: string = 'hub') {
    return defineType({
        name: 'post',
        title: 'Post',
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
                name: 'date',
                title: 'Date',
                type: 'datetime',
                description: 'Date and time  define the order of posts',
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
                type: 'bodyPost',
                title: 'Body',
                group: 'page'
            }),
            defineField({
                name: 'author',
                title: 'Author',
                type: 'reference',
                to: [{ type: 'person' }],
                options: {
                    disableNew: true,
                    filter: ({ document }: any) => filterByDocumentApp(document)
                },
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
                name: 'parent',
                title: 'Parent page',
                type: 'reference',
                description: 'Set a page with all posts for easier navigation',
                to: [{ type: 'page' }],
                options: {
                    disableNew: true,
                    filter: ({ document }: any) => filterByDocumentApp(document)
                },
                readOnly: false,
                group: 'connections'
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
                metaCover: 'metadata.sharedImage'
            },
            prepare({ title, covers, metaCover }) {
                const localeTitle = selectDefaultLocale(title);
                const cover = getMediaCover(covers) || metaCover;
                return {
                    title: localeTitle || 'Post',
                    subtitle: localeTitle ? 'Post' : '',
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
