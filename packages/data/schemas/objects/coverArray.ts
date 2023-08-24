import { defineType } from 'sanity';
import { CoverImage } from './coverImage';
import { CoverVideo } from './coverVideo';

export type CoverBlock = CoverImage | CoverVideo;

export default function coverArray() {
    return defineType({
        name: 'coverArray',
        title: 'Covers',
        type: 'array',
        description: 'Images or video files are accepteed. Use drag&drop for multiple files.',
        of: [{ type: 'coverImage' }, { type: 'coverVideo' }]
    });
}
