import { defineType, defineField, SanityDocument, Slug } from 'sanity';
import { DocumentIcon } from '@sanity/icons';
import { BodyBlock, CoverBlock, LocaleString } from '../objects';
import { App } from '../system/app';
import { MetadataPage } from '../sections';
import { getMediaCover, selectDefaultLocale } from '../../utils';
import globalConfig from 'globals/globalConfig';
import { Theme } from '../system';

export interface Page extends SanityDocument {
    _type: 'page' | 'reference';
    _ref?: string;
    title?: LocaleString;
    slug: Slug;
    app?: App;
    covers?: CoverBlock[];
    index?: boolean;
    body?: BodyBlock[];
    theme?: Theme;
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
                group: 'card'
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
