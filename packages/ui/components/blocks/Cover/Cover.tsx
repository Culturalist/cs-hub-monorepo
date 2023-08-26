import { CoverBlock, CoverParent, ImageSources, LocaleString, VideoSources } from 'data/schemas';
import { DefaultProps } from 'globals';
import { createStyles } from './Cover.styles';
import HeroImage from './HeroImage';
import HeroVideo from './HeroVideo';
import PageImage from './PageImage';
import PageVideo from './PageVideo';

interface CoverProps extends DefaultProps {
    array?: CoverBlock[];
    caption?: LocaleString;
    alt?: LocaleString;
    parent?: CoverParent;
}

export default function Cover(props: CoverProps) {
    const { array, caption, alt, parent = 'page', lang, className } = props;
    let images: ImageSources = {};
    let video: VideoSources = {};
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
                    cover.useMedia.forEach(use => (video[use] = cover));
            }
        });

    if (Object.keys(video).length > 0) {
        if (parent == 'hero')
            return <HeroVideo sources={video} posters={images} lang={lang} className={styles.container} />;
        else if (parent == 'page') {
            return <PageVideo sources={video} posters={images} lang={lang} className={styles.container} />;
        }
    } else if (Object.keys(images).length > 0) {
        if (parent == 'hero')
            return <HeroImage sources={images} alt={alt || caption} lang={lang} className={styles.container} />;
        else if (parent == 'page')
            return <PageImage sources={images} alt={alt || caption} lang={lang} className={styles.container} />;
    }

    return null;
}
