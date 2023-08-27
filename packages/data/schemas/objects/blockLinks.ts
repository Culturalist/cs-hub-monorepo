import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';
import { joinLocaleStrings } from '../../utils';
import { LinksLayout, linksLayoutList } from '../values';
import { LinkCaptioned } from './linkCaptioned';
import { capitalize } from 'weresk';

export interface BlockLinks {
    _type: 'blockLinks';
    layout: LinksLayout;
    links?: LinkCaptioned[];
}

export default function blockLinks(appName: string = 'hub') {
    return defineType({
        name: 'blockLinks',
        title: 'Links',
        type: 'object',
        fields: [
            defineField({
                name: 'layout',
                title: 'Layout',
                type: 'string',
                initialValue: 'list',
                options: {
                    list: linksLayoutList,
                    layout: 'radio',
                    direction: 'horizontal'
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'links',
                title: 'Links',
                type: 'array',
                of: [{ type: 'linkCaptioned' }]
            })
        ],
        preview: {
            select: {
                link1: 'links.0.caption',
                link2: 'links.1.caption',
                link3: 'links.2.caption',
                layout: 'layout'
            },
            prepare({ link1, link2, link3, layout }) {
                const names = joinLocaleStrings([link1, link2, link3]);
                const subtitle = layout == 'list' ? 'Links list' : capitalize(layout);
                return {
                    title: names || subtitle,
                    subtitle: names ? subtitle : ''
                };
            }
        },
        icon: LinkIcon
    });
}
