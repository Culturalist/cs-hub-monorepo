import { FileObject, ImageObject } from 'globals';

export type UseMedia = 'desktop' | 'mobile';
export type CoverParent = 'hero' | 'page';
export type ImageSources = Partial<Record<UseMedia, ImageObject>>;
export type VideoSources = Partial<Record<UseMedia, FileObject>>;

export const useMediaList = [
    { title: 'Desktop', value: 'desktop' },
    { title: 'Mobile', value: 'mobile' }
];
export const useMediaInitialValue = ['desktop', 'mobile'];
