import { defineType, defineField } from '@sanity/types';
import { PlayIcon } from '@sanity/icons';
import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { LocaleString } from '../localeString';
import { selectDefaultLocale } from '../../../utils';
import { DefaultSchemaProps } from 'globals';

interface SchemaProps extends DefaultSchemaProps {}

export interface MediaVideo {
    _type: 'mediaVideo';
    _key: string;
    asset?: SanityAsset;
    url?: string;
    caption?: LocaleString;
    autoplay?: boolean;
}

export default function mediaVideo({ appName = 'hub' }: SchemaProps) {
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
                name: 'autoplay',
                title: 'Autoplay',
                type: 'boolean',
                description: 'With autoplay audio will be muted by default',
                initialValue: false
            }),
            defineField({
                name: 'caption',
                title: 'Caption',
                type: 'localeString',
                options: {
                    collapsible: true,
                    collapsed: true
                }
            })
        ],
        preview: {
            select: {
                caption: 'caption'
            },
            prepare({ caption }) {
                const title = selectDefaultLocale(caption);
                return {
                    title: title || 'Video',
                    subtitle: title ? 'Video' : ''
                };
            }
        },
        icon: PlayIcon
    });
}
