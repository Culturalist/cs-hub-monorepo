import { CoverBlock, CoverImage, MediaBlock, MediaImage } from '../schemas';

export function getMediaCover(covers: (MediaBlock | CoverBlock)[]): MediaImage | CoverImage | undefined {
    let output: MediaImage | CoverImage | undefined;
    covers &&
        covers.every(mediaBlock => {
            if (mediaBlock._type == 'mediaImage' && mediaBlock.asset) {
                output = mediaBlock;
            } else if (mediaBlock._type == 'coverImage' && mediaBlock.asset) {
                output = mediaBlock;
            }
            return !output;
        });
    return output;
}
