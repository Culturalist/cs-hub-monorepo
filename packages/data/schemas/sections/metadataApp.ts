import { defineType, defineField } from 'sanity';
import { LocaleString } from '../objects/localeString';
import { ImageObject } from 'globals';

export interface MetadataApp {
    _type: 'metadataHome';
    sharedImage?: ImageObject;
    title?: LocaleString;
    template?: LocaleString;
    description?: LocaleString;
    keywords?: LocaleString;
    // organization?: LocaleString;
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
            // defineField({
            //     name: 'organization',
            //     title: 'Organization',
            //     type: 'localeString'
            // }),
            defineField({
                name: 'sharedImage',
                title: 'SharedImage',
                description: 'Default image for Opengraph covers',
                type: 'image'
            })
        ]
    });
}
