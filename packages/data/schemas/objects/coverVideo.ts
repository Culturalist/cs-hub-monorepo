import { defineType, defineField } from 'sanity';
import { PlayIcon } from '@sanity/icons';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { UseMedia, useMediaInitialValue, useMediaList } from '../values';
import { caseTransform } from 'weresk/utils';

export interface CoverVideo {
    _type: 'coverVideo';
    _key: string;
    asset?: SanityAsset;
    url?: string;
    useMedia: UseMedia[];
}

export default function coverVideo(appName: string = 'hub') {
    return defineType({
        name: 'coverVideo',
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
            })
        ],
        preview: {
            select: {
                use: 'useMedia'
            },
            prepare({ use }) {
                return {
                    title: 'Video',
                    subtitle: use && use.length > 0 ? caseTransform(use.join(' | '), 'title') : ''
                };
            }
        },
        icon: PlayIcon
    });
}
