import { ImageObject } from 'globals';
import globalConfig from 'globals/globalConfig';
import { defineField, defineType } from 'sanity';
import { filterByDocumentApp } from '../../utils';
import { LinkContact } from '../objects/linkContact';
import { LocalePortableText } from '../objects/localePortableText';
import { PageDocument } from '../values';

export interface Footer {
    _type: 'footer';
    logo?: ImageObject;
    links?: PageDocument[];
    contacts?: LocalePortableText;
    social?: LinkContact[];
}

export default function footer(appName: string = 'hub') {
    return defineType({
        name: 'footer',
        title: 'Footer',
        type: 'object',
        fields: [
            defineField({
                name: 'logo',
                title: 'Logo',
                type: 'image',
                description: 'Only SVG or PNG with transparency can be used.',
                options: {
                    accept: '.svg,.png'
                }
            }),
            defineField({
                name: 'links',
                title: 'Links',
                description: 'Bottom navigation',
                type: 'array',
                of: [
                    {
                        type: 'reference',
                        to: globalConfig.apps[appName].schemas.navigation.map(docType => ({ type: docType })),
                        options: {
                            disableNew: true,
                            filter: ({ document }: any) => filterByDocumentApp(document)
                        }
                    }
                ]
            }),
            defineField({
                name: 'contacts',
                title: 'Contacts',
                type: 'localePortableTextField'
            }),
            defineField({
                name: 'social',
                title: 'Social links',
                type: 'array',
                of: [{ type: 'linkContact' }]
            })
        ]
    });
}
