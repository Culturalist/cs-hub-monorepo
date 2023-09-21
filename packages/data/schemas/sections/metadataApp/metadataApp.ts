import { defineType, defineField } from '@sanity/types';
import { ImageObject, FileObject } from 'globals';
import { LocaleString } from '../../objects';

export interface MetadataApp {
    _type: 'metadataHome';
    title?: LocaleString;
    template?: LocaleString;
    description?: LocaleString;
    keywords?: LocaleString;
    sharedImage?: ImageObject;
    sharedVideo?: FileObject;
}

export default function metadataApp() {
    return defineType({
        name: 'metadataApp',
        title: 'Metadata',
        type: 'object',
        fields: [
            defineField({
                name: 'title',
                title: 'Default title',
                type: 'localeString'
            }),
            defineField({
                name: 'template',
                title: 'Title template',
                description: 'Common part for pages titles. %s will be replaced with page title.',
                type: 'localeString'
            }),
            defineField({
                name: 'description',
                title: 'Description',
                type: 'localeText'
            }),
            defineField({
                name: 'keywords',
                title: 'Keywords',
                type: 'localeText'
            }),
            defineField({
                name: 'sharedImage',
                title: 'OpenGraph Image',
                description: 'Default image for Opengraph covers',
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
            })
        ]
    });
}
