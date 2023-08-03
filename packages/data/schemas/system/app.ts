import { defineType, defineField, SanityDocument } from 'sanity';
import { ComponentIcon } from '@sanity/icons';
import { MetadataApp } from '../objects/metadataApp';
import { Language } from './language';

export interface App extends SanityDocument {
    _type: 'app' | 'reference';
    _ref?: string;
    title?: string;
    languages?: Language[];
    metadata?: MetadataApp;
}

const app = defineType({
    name: 'app',
    title: 'App',
    type: 'document',
    groups: [
        {
            name: 'general',
            title: 'General'
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
            type: 'string',
            group: 'general'
        }),
        defineField({
            name: 'languages',
            title: 'Languages',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [
                        {
                            type: 'language'
                        }
                    ],
                    options: {
                        disableNew: true
                    }
                }
            ],
            group: 'general'
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
            return {
                title: title ? title : 'App',
                subtitle: title ? 'App' : ''
            };
        }
    },
    icon: ComponentIcon
});

export default app;
