import { defineType, defineField, SanityDocument, Slug } from 'sanity';
import { PresentationIcon } from '@sanity/icons';
import { BodyBlock, LocaleString, MediaBlock } from '../objects';
import { App } from '../system/app';
import { MetadataPage } from '../sections';
import { filterByDocumentApp, getMediaCover, selectDefaultLocale } from '../../utils';
import globalConfig from 'globals/globalConfig';
import { Person } from './person';
import { Page } from './page';
import { Label } from '../system';

export interface Project extends SanityDocument {
    _type: 'project' | 'reference';
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

export default function project(appName: string = 'hub') {
    return defineType({
        name: 'project',
        title: 'Project',
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
                description: 'Date and time  define the order of projects',
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
                type: 'bodyProject',
                title: 'Body',
                group: 'page'
            }),
            defineField({
                name: 'label',
                title: 'Label',
                type: 'reference',
                description: 'Use labels for grouping the projects, if necessarily',
                to: [{ type: 'label' }],
                group: 'connections'
            }),
            defineField({
                name: 'parent',
                title: 'Parent page',
                type: 'reference',
                description: 'Set a page with all projects for easier navigation',
                to: [{ type: 'page' }],
                options: {
                    disableNew: true,
                    filter: ({ document }: any) => filterByDocumentApp(document)
                },
                readOnly: !globalConfig.debug,
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
                appName: 'app._ref',
                title: 'title',
                covers: 'covers',
                metaCover: 'metadata.sharedImage'
            },
            prepare({ appName, title, covers, metaCover }) {
                const localeTitle = selectDefaultLocale(title, appName);
                const cover = getMediaCover(covers) || metaCover;
                return {
                    title: localeTitle || 'Project',
                    subtitle: localeTitle ? 'Project' : '',
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
