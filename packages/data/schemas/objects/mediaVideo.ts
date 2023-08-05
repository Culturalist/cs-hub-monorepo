import { defineType, defineField } from 'sanity';
import { PlayIcon } from '@sanity/icons';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { UseMedia, useMediaInitialValue, useMediaList } from '../values';
import { LocaleString } from './localeString';
import { selectDefaultLocale } from '../../utils';
import { caseTransform } from 'weresk/utils';

export interface MediaVideo {
    _type: 'mediaVideo';
    _key: string;
    asset?: SanityAsset;
    url?: string;
    useMedia: UseMedia[];
    alt?: LocaleString;
    caption?: LocaleString;
}

export default function mediaVideo(appName: string = 'hub') {
    return defineType({
        name: 'mediaVideo',
        title: 'Video',
        type: 'file',
        description: 'Accepted formats: .mp4',
        options: {
            accept: '.mp4'
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
                use: 'useMedia'
            },
            prepare({ alt, caption, use }) {
                const title = selectDefaultLocale(alt, appName) || selectDefaultLocale(caption, appName);
                return {
                    title: title || 'Video',
                    subtitle: use && use.length > 0 ? caseTransform(use.join(' | '), 'title') : ''
                };
            }
        },
        icon: PlayIcon
    });
}
