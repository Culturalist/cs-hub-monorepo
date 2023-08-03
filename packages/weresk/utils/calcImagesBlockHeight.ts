import { SanityImage } from '../lib/sanity';
import { calcImagesAspectRatio } from './calcImagesAspectRatio';

interface calcImagesBlockHeightOptions {
    maxHeight?: number;
    mode?: 'max' | 'average';
}

export function calcImagesBlockHeight(
    images: SanityImage[],
    width: number,
    options?: calcImagesBlockHeightOptions
): number | undefined {
    const maxHeight = options?.maxHeight;
    const mode = options?.mode ? options.mode : 'max';
    const maxAspectRatio = calcImagesAspectRatio(images, { mode: 'max' });
    const minAspectRatio = calcImagesAspectRatio(images, { mode: 'min' });
    let height: number | undefined = undefined;

    if (mode === 'average' && maxAspectRatio && minAspectRatio) {
        height = Math.floor(width / ((maxAspectRatio + minAspectRatio) / 2));
    } else if (maxAspectRatio) {
        height = Math.floor(width / maxAspectRatio);
    }
    height = height && maxHeight && height > maxHeight ? Math.floor(maxHeight) : height;
    return height;
}
