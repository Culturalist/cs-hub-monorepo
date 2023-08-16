import { MediaBlock } from '../schemas/objects/mediaArray';
import { MediaImage } from '../schemas/objects/mediaImage';

export default function getMediaCover(covers: MediaBlock[]): MediaImage | undefined {
    let output: MediaImage | undefined;
    covers &&
        covers.every(mediaBlock => {
            if (mediaBlock._type == 'mediaImage' && mediaBlock.asset) {
                output = mediaBlock;
            }
            return !!output;
        });
    return output;
}
