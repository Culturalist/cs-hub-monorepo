import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import globalConfig from 'globals/globalConfig';
import { defineField, defineType } from 'sanity';
import { filterByDocumentApp, getAppLanguageList } from '../../utils';
import { LinkCaptioned } from '../objects';
import { PageDocument } from '../values';

export interface Header {
    _type: 'header';
    logo?: SanityImageObject;
    marker?: LinkCaptioned;
    links?: PageDocument[];
    languages?: string[];
}

export default function header(appName: string = 'hub') {
    return defineType({
        name: 'header',
        title: 'Header',
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
                name: 'marker',
                title: 'Marker',
                type: 'linkCaptioned',
                description: 'Optional caption with or without link (dates, open call, etc.)',
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }),
            defineField({
                name: 'links',
                title: 'Links',
                description: 'Top menu navigation',
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
                name: 'languages',
                title: 'Active languages',
                description:
                    'Turning off one of the languages prevent user from manually selecting it in the menu, but pages of this language will still be created and accessible by link.',
                type: 'array',
                of: [{ type: 'string' }],
                options: {
                    // layout: 'grid',
                    list: getAppLanguageList(appName)
                }
            })
        ]
    });
}
