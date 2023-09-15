import { DefaultSchemaProps } from 'globals';
import { defineType } from '@sanity/types';
import { MediaImage } from '../mediaImage';
import { MediaVideo } from '../mediaVideo';

interface SchemaProps extends DefaultSchemaProps {}

export type MediaBlock = MediaImage | MediaVideo;

export default function mediaArray({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'mediaArray',
        title: 'Media',
        type: 'array',
        description: 'Images or video files are accepteed. Use drag&drop for multiple files.',
        of: [{ type: 'mediaImage' }, { type: 'mediaVideo' }]
    });
}
