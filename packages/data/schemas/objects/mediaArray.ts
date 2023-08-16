import { defineType } from 'sanity';
import { capitalize } from 'weresk/utils';
import { mediaArrays, MediaParent, MediaBlockFormat } from '../values';
import { MediaEmbed } from './mediaEmbed';
import { MediaImage } from './mediaImage';
import { MediaVideo } from './mediaVideo';

export type MediaBlock = MediaImage | MediaVideo | MediaEmbed;

export default function mediaArray(parent: MediaParent) {
    return defineType({
        name: `mediaArray${capitalize(parent)}`,
        title: 'Media',
        type: 'array',
        description: 'Images or video files are accepteed. Use drag&drop for multiple files.',
        of: [{ type: 'mediaImage' }, { type: 'mediaVideo' }, { type: 'mediaEmbed' }].filter(block =>
            mediaArrays[parent].includes(block.type as MediaBlockFormat)
        )
    });
}
