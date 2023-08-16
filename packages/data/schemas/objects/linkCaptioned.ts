import { defineField, defineType } from 'sanity';
import { selectDefaultLocale } from '../../utils';
import { LinkIcon } from '@sanity/icons';
import { LocaleString } from './localeString';
import { LinkTyped } from './linkTyped';

export interface LinkCaptioned {
    _type: 'linkCaptioned';
    _key: string;
    caption?: LocaleString;
    link?: LinkTyped;
}

export default function linkCaptioned(appName: string) {
    return defineType({
        name: 'linkCaptioned',
        title: 'Link',
        type: 'object',
        fields: [
            defineField({
                name: 'caption',
                title: 'Caption',
                type: 'localeString',
                options: {
                    collapsed: false
                }
            }),
            defineField({
                name: 'link',
                title: 'Link',
                type: 'linkTyped',
                options: {
                    collapsed: false
                }
            })
        ],
        preview: {
            select: {
                caption: 'caption',
                link: 'link'
            },
            prepare({ caption, link }) {
                const localeCaption = selectDefaultLocale(caption, appName);
                const url = '';
                return {
                    title: localeCaption || 'Link',
                    subtitle: localeCaption ? url : ''
                };
            }
        },
        icon: LinkIcon
    });
}
