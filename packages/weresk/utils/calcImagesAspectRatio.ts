import { SanityImage } from '../lib/sanity';

interface CalcImagesAspectRatioOptions {
    mode?: 'average' | 'max' | 'min';
}

export function calcImagesAspectRatio(
    images: SanityImage[],
    options?: CalcImagesAspectRatioOptions
): number | undefined {
    let mode = options && options.mode ? options.mode : 'average';
    let maxAspectRatio = 0;
    let minAspectRatio = 100;
    let sumAspectRatio = 0;
    images.forEach(image => {
        if (image.asset?.metadata?.dimensions?.aspectRatio) {
            if (image.asset.metadata.dimensions.aspectRatio > maxAspectRatio) {
                maxAspectRatio = image.asset.metadata.dimensions.aspectRatio;
            }
            if (image.asset.metadata.dimensions.aspectRatio < minAspectRatio) {
                minAspectRatio = image.asset.metadata.dimensions.aspectRatio;
            }
            sumAspectRatio += image.asset.metadata.dimensions.aspectRatio;
        }
    });

    if (mode === 'min' && minAspectRatio) return minAspectRatio;
    else if (mode === 'max' && maxAspectRatio < 100) return maxAspectRatio;
    else if (sumAspectRatio) return sumAspectRatio / images.length;
    return undefined;
}
