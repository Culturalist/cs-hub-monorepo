import { DefaultProps, ImageObject } from 'globals';
import { createStyles } from './PageImage.styles';
import { LocaleString, UseMedia } from 'data';
import { AdaptiveDimentions, box } from '../../../../utils';
import { getImageUrl } from 'globals/lib/sanity';
import Image from '../../Image';

export type ImageSources = Partial<Record<UseMedia, ImageObject>>;

interface PageImageProps extends DefaultProps {
    sources: ImageSources;
    alt?: LocaleString;
}

export default function PageImage(props: PageImageProps) {
    const { sources, alt, lang, className } = props;
    if (Object.keys(sources).length == 0) return null;

    const styles = createStyles({ className });
    const desktop = sources.desktop || sources.mobile;
    const mobile = sources.mobile || sources.desktop;

    const sizes: AdaptiveDimentions = {
        xs: box([12, 12], 'xs'),
        sm: box([24, 16], 'sm'),
        md: box([24, 16], 'md'),
        lg: box([24, 12], 'lg')
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
