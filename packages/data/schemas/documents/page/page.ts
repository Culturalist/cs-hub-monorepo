import { defineType, defineField, SanityDocument, Slug } from '@sanity/types';
import { DocumentIcon } from '@sanity/icons';
import { BodyBlock, CoverBlock, LocaleString } from '../../objects';
import { MetadataPage } from '../../sections';
import { getMediaCover, selectDefaultLocale } from '../../../utils';
import { globalConfig } from 'globals';
import { Theme } from '../../system';

export interface Page extends SanityDocument {
    _type: 'page' | 'reference';
    _ref?: string;
    _key?: string;
    title?: LocaleString;
    slug: Slug;
    covers?: CoverBlock[];
    coverCaption?: LocaleString;
    index?: boolean;
    body?: BodyBlock[];
    theme?: Theme;
    metadata?: MetadataPage;
}

export default function page() {
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
                name: 'slug',
                type: 'normalizedSlug',
                validation: Rule => Rule.required(),
                group: 'card'
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
                name: 'index',
                title: 'Page index',
                description: 'Creates page index from blocks with titles and IDs',
                type: 'boolean',
                initialValue: false,
                group: 'page'
            }),
            defineField({
                name: 'body',
                type: 'bodyPage',
                title: 'Body',
                group: 'page'
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
                by: [{ field: `title.${globalConfig.localization.default}`, direction: 'asc' }]
            }
        ]
    });
}
