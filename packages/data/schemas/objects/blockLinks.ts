import { defineField, defineType } from 'sanity';
import { LinkIcon } from '@sanity/icons';
import { joinLocaleStrings } from '../../utils';
import { LinksLayout, linksTypeList } from '../values';
import { LinkCaptioned } from './linkCaptioned';

export interface BlockLinks {
    _type: 'blockLinks';
    layout: LinksLayout;
    links?: LinkCaptioned[];
}

export default function blockLinks(appName: string) {
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
                    list: linksTypeList,
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
            }),
            defineField({
                name: 'blockId',
                title: 'Block ID',
                type: 'blockId'
            })
        ],
        preview: {
            select: {
                link1: 'links.0.caption',
                link2: 'links.1.caption',
                link3: 'links.2.caption',
                id: 'blockId.current'
            },
            prepare({ link1, link2, link3, id }) {
                const names = joinLocaleStrings([link1, link2, link3], appName);
                const subtitle = `${names ? 'Links ' : ''}${id || ''}`;
                return {
                    title: names || 'Cards',
                    subtitle: subtitle
                };
            }
        },
        icon: LinkIcon
    });
}
