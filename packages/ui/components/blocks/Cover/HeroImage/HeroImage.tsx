import { DefaultProps, ImageObject } from 'globals';
import { createStyles } from './HeroImage.styles';
import { LocaleString, UseMedia } from 'data';
import { AdaptiveDimentions, imageBoxToFill, imageWidthToFill } from '../../../../utils';
import { getImageUrl } from 'globals/lib/sanity';
import Image from '../../Image';

export type ImageSources = Partial<Record<UseMedia, ImageObject>>;

interface HeroImageProps extends DefaultProps {
    sources: ImageSources;
    alt?: LocaleString;
}

export default function HeroImage(props: HeroImageProps) {
    const { sources, alt, lang, className } = props;
    if (Object.keys(sources).length == 0) return null;

    const styles = createStyles({ className });
    const desktop = sources.desktop || sources.mobile;
    const mobile = sources.mobile || sources.desktop;

    const aspectRatio = {
        desktop: desktop?.asset?.metadata?.dimensions?.aspectRatio,
        mobile: mobile?.asset?.metadata?.dimensions?.aspectRatio
    };
    const container = {
        xs: 2 / 3,
        sm: 1,
        md: 3 / 2,
        lg: 16 / 9
    };

    const sizes: AdaptiveDimentions = {
        xs: imageBoxToFill(aspectRatio.mobile, container.xs, 'xs'),
        sm: imageBoxToFill(aspectRatio.mobile, container.sm, 'sm'),
        md: imageBoxToFill(aspectRatio.desktop, container.md, 'md'),
        lg: imageBoxToFill(aspectRatio.desktop, container.lg, 'lg')
    };

    const coverUrls = desktop &&
        mobile && {
            xs: getImageUrl(mobile, ...sizes.xs.map(s => s * 2)),
            sm: getImageUrl(mobile, ...sizes.sm.map(s => s * 2)),
            md: getImageUrl(desktop, ...sizes.md.map(s => s * 2)),
            lg: getImageUrl(desktop, ...sizes.lg.map(s => s * 2))
        };

    return (
        <div className={styles.container}>
            <Image sources={coverUrls} sizes={sizes} alt={alt} lang={lang} className={styles.image} />
        </div>
    );
}
