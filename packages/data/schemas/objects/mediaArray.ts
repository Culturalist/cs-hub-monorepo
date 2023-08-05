import { defineType } from 'sanity';
import { MediaEmbed } from './mediaEmbed';
import { MediaImage } from './mediaImage';
import { MediaVideo } from './mediaVideo';

export type MediaBlock = MediaImage | MediaVideo | MediaEmbed;

export default function mediaArray() {
    return defineType({
        name: 'mediaArray',
        title: 'Media',
        type: 'array',
        description: 'Images or video files are accepteed. Use drag&drop for multiple files.',
        of: [{ type: 'mediaImage' }, { type: 'mediaVideo' }, { type: 'mediaEmbed' }]
    });
}
