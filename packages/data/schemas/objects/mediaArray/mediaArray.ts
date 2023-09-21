import { defineType } from '@sanity/types';
import { MediaImage } from '../mediaImage';
import { MediaVideo } from '../mediaVideo';

export type MediaBlock = MediaImage | MediaVideo;

export default function mediaArray() {
    return defineType({
        name: 'mediaArray',
        title: 'Media',
        type: 'array',
        description: 'Images or video files are accepteed. Use drag&drop for multiple files.',
        of: [{ type: 'mediaImage' }, { type: 'mediaVideo' }]
    });
}
