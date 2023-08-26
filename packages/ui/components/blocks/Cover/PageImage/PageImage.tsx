import { DefaultProps, ImageObject } from 'globals';
import { createStyles } from './PageImage.styles';
import { LocaleString, UseMedia } from 'data';
import { AdaptiveDimentions, box, boxPx } from '../../../../utils';
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
        md: box([24, 12], 'md'),
        lg: box([24, 12], 'lg')
    };

    const coverUrls = desktop &&
        mobile && {
            xs: getImageUrl(mobile, ...boxPx(sizes, 'xs')),
            sm: getImageUrl(desktop, ...boxPx(sizes, 'sm')),
            md: getImageUrl(desktop, ...boxPx(sizes, 'md')),
            lg: getImageUrl(desktop, ...boxPx(sizes, 'lg'))
        };

    return (
        <div className={styles.container}>
            <Image sources={coverUrls} sizes={sizes} alt={alt} lang={lang} className={styles.image} />
        </div>
    );
}
