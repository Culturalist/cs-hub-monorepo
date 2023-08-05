import { defineType, defineField } from 'sanity';
import { ImageIcon } from '@sanity/icons';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { useMediaList, useMediaInitialValue, UseMedia } from '../values';
import { LocaleString } from './localeString';
import { selectDefaultLocale } from '../../utils';
import { caseTransform } from 'weresk/utils';

export interface MediaImage extends SanityImageObject {
    _type: 'mediaImage';
    _key: string;
    useMedia?: UseMedia[];
    alt?: LocaleString;
    caption?: LocaleString;
}

export default function mediaImage(appName: string = 'hub') {
    return defineType({
        name: 'mediaImage',
        title: 'Image',
        type: 'image',
        options: {
            hotspot: true
        },
        fields: [
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
                media: 'asset',
                use: 'useMedia'
            },
            prepare({ alt, caption, media, use }) {
                const title = selectDefaultLocale(alt, appName) || selectDefaultLocale(caption, appName);
                return {
                    title: title || 'Image',
                    subtitle: use && use.length > 0 ? caseTransform(use.join(' | '), 'title') : '',
                    media: media
                };
            }
        },
        icon: ImageIcon
    });
}
