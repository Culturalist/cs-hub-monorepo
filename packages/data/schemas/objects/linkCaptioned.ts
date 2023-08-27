import { defineField, defineType } from 'sanity';
import { selectDefaultLocale, linkPreview } from '../../utils';
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
                link: 'link',
                referenceSlug: 'link.reference.slug.current',
                referenceType: 'link.reference._type',
                fileUrl: 'link.file.asset.url'
            },
            prepare({ caption, link }) {
                const localeCaption = selectDefaultLocale(caption);
                const url = linkPreview(link);
                return {
                    title: localeCaption || 'Link',
                    subtitle: url
                };
            }
        },
        icon: LinkIcon
    });
}
