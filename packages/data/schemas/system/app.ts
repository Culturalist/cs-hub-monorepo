import { defineType, defineField, SanityDocument } from 'sanity';
import { ComponentIcon } from '@sanity/icons';
import { MetadataApp } from '../objects/metadataApp';
import { selectDefaultLocale } from '../../utils';

export interface App extends SanityDocument {
    _type: 'app' | 'reference';
    _ref?: string;
    title?: string;
    metadata?: MetadataApp;
}

export default function app() {
    return defineType({
        name: 'app',
        title: 'App',
        type: 'document',
        groups: [
            {
                name: 'navigation',
                title: 'Navigation'
            },
            {
                name: 'main',
                title: 'Main'
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
                title: 'Website title',
                type: 'localeString'
            }),
            defineField({
                name: 'header',
                title: 'Header',
                type: 'header',
                group: 'navigation'
            }),
            defineField({
                name: 'footer',
                title: 'Footer',
                type: 'footer',
                group: 'navigation'
            }),
            defineField({
                name: 'hero',
                title: 'Hero',
                type: 'hero',
                group: 'main'
            }),
            defineField({
                name: 'theme',
                title: 'Website theme',
                type: 'reference',
                to: [{ type: 'theme' }],
                group: 'style'
            }),
            defineField({
                name: 'metadata',
                title: 'Metadata',
                type: 'metadataApp',
                group: 'seo'
            })
        ],
        preview: {
            select: {
                id: '_id',
                title: 'title'
            },
            prepare({ id, title }) {
                const localeTitle = selectDefaultLocale(title, id);
                return {
                    title: localeTitle || 'App',
                    subtitle: localeTitle ? 'App' : ''
                };
            }
        },
        icon: ComponentIcon
    });
}
