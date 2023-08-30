import { defineType, defineField, SanityDocument } from 'sanity';
import { ComponentIcon } from '@sanity/icons';
import { MetadataApp } from '../sections/metadataApp';
import { getAppLanguageList, selectDefaultLocale } from '../../utils';
import { LocaleString } from '../objects/localeString';
import { Footer, Header, Hero } from '../sections';
import { Theme } from './theme';

export interface App extends SanityDocument {
    _type: 'app' | 'reference';
    _ref?: string;
    languages?: string[];
    title?: LocaleString;
    header?: Header;
    footer?: Footer;
    hero?: Hero;
    theme?: Theme;
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
                name: 'languages',
                title: 'Active languages',
                type: 'array',
                of: [{ type: 'string' }],
                options: {
                    list: getAppLanguageList()
                },
                validation: Rule => Rule.required().min(1)
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
                name: 'body',
                type: 'bodyApp',
                title: 'Body',
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
                title: 'title'
            },
            prepare({ title }) {
                const localeTitle = selectDefaultLocale(title);
                return {
                    title: localeTitle || 'App',
                    subtitle: localeTitle ? 'App' : ''
                };
            }
        },
        icon: ComponentIcon,
        __experimental_omnisearch_visibility: false
    });
}
