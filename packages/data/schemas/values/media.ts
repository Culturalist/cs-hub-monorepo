import { ImageObject, FileObject } from 'globals';

export const useMediaList = [
    { title: 'Desktop', value: 'desktop' },
    { title: 'Mobile', value: 'mobile' }
];
export const useMediaInitialValue = ['desktop', 'mobile'];
export type UseMedia = 'desktop' | 'mobile';

export const mediaFormats = ['image', 'video', 'embed'];
export type MediaFormat = 'image' | 'video' | 'embed';
export type MediaBlockFormat = `media${Capitalize<MediaFormat>}`;
export interface MediaElement {
    type: MediaBlockFormat;
}

export type MediaParent = 'hero' | 'cover' | 'block';
export const mediaParents: MediaParent[] = ['hero', 'cover', 'block'];

export type CoverParent = 'hero' | 'page';

export const mediaArrays: Record<MediaParent, MediaBlockFormat[]> = {
    hero: ['mediaImage', 'mediaVideo'],
    cover: ['mediaImage', 'mediaVideo'],
    block: ['mediaImage', 'mediaVideo', 'mediaEmbed']
};

export type ImageSources = Partial<Record<UseMedia, ImageObject>>;
export type VideoSources = Partial<Record<UseMedia, FileObject>>;
