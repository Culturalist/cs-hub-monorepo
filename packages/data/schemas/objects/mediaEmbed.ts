import { defineType, defineField } from 'sanity';
import { CodeBlockIcon } from '@sanity/icons';
import { UseMedia, useMediaInitialValue, useMediaList } from '../values';
import { LocaleString } from './localeString';
import { selectDefaultLocale } from '../../utils';
import { caseTransform } from 'weresk/utils';

export interface MediaEmbed {
    _type: 'mediEmbed';
    _key: string;
    link?: string;
    useMedia: UseMedia[];
    alt?: LocaleString;
    caption?: LocaleString;
}

export default function mediaEmbed(appName: string = 'hub') {
    return defineType({
        name: 'mediaEmbed',
        title: 'Embedded',
        type: 'object',
        fields: [
            defineField({
                name: 'link',
                title: 'Link',
                type: 'url',
                description: 'Vimeo link',
                validation: Rule =>
                    Rule.custom(link => {
                        const regex = /^(http|https):\/\/vimeo.com\S+/g;
                        if (!link || regex.test(link)) {
                            return true;
                        } else {
                            return 'Not a valid Vimeo link';
                        }
                    })
            }),
            defineField({
                name: 'useMedia',
                title: 'Can be used',
                type: 'array',
                of: [{ type: 'string' }],
                initialValue: useMediaInitialValue,
                options: {
                    list: useMediaList
                    // layout: 'grid'
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'alt',
                title: 'Alternative text',
                type: 'localeString'
            }),
            defineField({
                name: 'caption',
                title: 'Caption',
                type: 'localeString'
            })
        ],
        preview: {
            select: {
                alt: 'alt',
                caption: 'caption',
                use: 'useMedia',
                link: 'link'
            },
            prepare({ alt, caption, use, link }) {
                const title = selectDefaultLocale(alt, appName) || selectDefaultLocale(caption, appName);
                return {
                    title: title || 'Embedded',
                    subtitle: use && use.length > 0 ? caseTransform(use.join(' | '), 'title') : ''
                };
            }
        },
        icon: CodeBlockIcon
    });
}
