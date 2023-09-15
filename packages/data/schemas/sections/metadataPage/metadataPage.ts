import { defineType, defineField } from '@sanity/types';
import { LocaleString } from '../../objects/localeString';
import { DefaultSchemaProps, FileObject, ImageObject } from 'globals';

interface SchemaProps extends DefaultSchemaProps {}

export interface MetadataPage {
    _type: 'metadataPage';
    sharedImage?: ImageObject;
    sharedVideo?: FileObject;
    title?: LocaleString;
    description?: LocaleString;
    keywords?: LocaleString;
    preventIndexing?: boolean;
}

export default function metadataPage({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'metadataPage',
        title: 'Metadata',
        description: 'Manual control over page metadata. If not set – will be set page or default specific values.',
        type: 'object',
        options: {
            collapsible: true
        },
        fields: [
            defineField({
                name: 'sharedImage',
                title: 'SharedImage',
                description: 'Image for Opengraph covers',
                type: 'image'
            }),
            defineField({
                name: 'sharedVideo',
                title: 'OpenGraph Video',
                type: 'file',
                description: 'Accepted formats: .mp4',
                options: {
                    accept: '.mp4'
                }
            }),
            defineField({
                name: 'title',
                title: 'Title',
                type: 'localeString',
                description: 'Title for search indexing and Opegraphs'
            }),
            defineField({
                name: 'description',
                title: 'Description',
                description: 'Description for search indexing and Opegraphs',
                type: 'localeText'
            }),
            defineField({
                name: 'keywords',
                title: 'Keywords',
                description: 'Will be added to global keywords for search indexing',
                type: 'localeText'
            }),
            defineField({
                name: 'preventIndexing',
                title: 'Prevent indexing',
                description: 'Set if you dont want this page to be indexed',
                type: 'boolean'
            })
        ]
    });
}
