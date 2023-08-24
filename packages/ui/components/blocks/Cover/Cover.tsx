import { CoverBlock, CoverParent, LocaleString, UseMedia } from 'data/schemas';
import { DefaultProps, ImageObject } from 'globals';
import { localizeString } from 'weresk/utils';
import { createStyles } from './Cover.styles';
import HeroImage from './HeroImage';
import PageImage from './PageImage';

interface CoverProps extends DefaultProps {
    array?: CoverBlock[];
    caption?: LocaleString;
    alt?: LocaleString;
    parent?: CoverParent;
}

export default function Cover(props: CoverProps) {
    const { array, caption, alt, parent = 'page', lang, className } = props;
    let images: Partial<Record<UseMedia, ImageObject>> = {};
    let video: Partial<Record<UseMedia, string>> = {};
    const styles = createStyles({ className, parent });

    array &&
        array.length > 0 &&
        [...array].reverse().forEach(cover => {
            if (cover._type == 'coverImage') {
                cover.asset &&
                    cover.useMedia &&
                    cover.useMedia.length > 0 &&
                    cover.useMedia.forEach(use => (images[use] = cover));
            } else if (cover._type == 'coverVideo') {
                cover.url &&
                    cover.useMedia &&
                    cover.useMedia.length > 0 &&
                    cover.useMedia.forEach(use => (video[use] = cover.url));
            }
        });

    // if (Object.keys(images).length == 0 && Object.keys(video).length == 0) return null;

    if (true) {
        if (parent == 'hero')
            return <HeroImage sources={images} alt={alt || caption} lang={lang} className={styles.container} />;
        else if (parent == 'page')
            return <PageImage sources={images} alt={alt || caption} lang={lang} className={styles.container} />;
    }

    return null;
}
