import { defineType, defineField } from '@sanity/types';
import { ImagesIcon } from '@sanity/icons';
import { MediaLayout, mediaLayoutList } from './blockMedia.values';
import { DefaultSchemaProps } from 'globals';
import { MediaBlock } from '../mediaArray';

interface SchemaProps extends DefaultSchemaProps {}

export interface BlockMedia {
    _type: 'blockMedia';
    layout: MediaLayout;
    media?: MediaBlock[];
}

export default function blockMedia({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'blockMedia',
        title: 'Media',
        type: 'object',
        fields: [
            defineField({
                name: 'layout',
                title: 'Layout',
                type: 'string',
                initialValue: 'full',
                options: {
                    list: mediaLayoutList,
                    layout: 'radio',
                    direction: 'horizontal'
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'media',
                title: 'Media',
                type: 'mediaArray'
            })
        ],
        preview: {
            select: {
                media: 'media',
                layout: 'layout'
            },
            prepare({ media, layout }) {
                const title = `Media${media && media.length > 0 ? ` (${media.length})` : ''}`;
                const subtitle = `${mediaLayoutList.find(el => el.value == layout)?.title} layout`;
                let cover = media.find((el: MediaBlock) => el._type == 'mediaImage');
                return {
                    title: title,
                    subtitle: subtitle,
                    media: cover
                };
            }
        },
        icon: ImagesIcon
    });
}
