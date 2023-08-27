import { ImageObject } from 'globals';
import globalConfig from 'globals/globalConfig';
import { defineField, defineType } from 'sanity';
import { filterByDocumentApp } from '../../utils';
import { LinkCaptioned } from '../objects';
import { PageDocument } from '../values';

export interface Header {
    _type: 'header';
    logo?: ImageObject;
    marker?: LinkCaptioned;
    links?: PageDocument[];
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
            })
        ]
    });
}
