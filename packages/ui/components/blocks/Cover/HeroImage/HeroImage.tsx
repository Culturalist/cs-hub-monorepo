import { Breakpoint, DefaultProps } from 'globals';
import { createStyles } from './HeroImage.styles';
import { ImageSources, LocaleString } from 'data/schemas';
import { AdaptiveDimentions, BoxDimentions, boxFromWidthRatio, boxPx, breakpoints } from '../../../../utils';
import { getImageUrl } from 'globals/lib/sanity';
import Image from '../../Image';
import globalConfig from 'globals/globalConfig';
import { mapKeys } from 'weresk/utils';

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

    const container = {
        xs: 2 / 3,
        sm: 1,
        md: 3 / 2,
        lg: 16 / 9
    };

    const sizes: AdaptiveDimentions = mapKeys<Breakpoint, BoxDimentions>(breakpoints, (br: Breakpoint) =>
        boxFromWidthRatio(globalConfig.breakpoints[br], container[br])
    );

    const coverUrls = desktop &&
        mobile && {
            xs: getImageUrl(mobile, ...boxPx(sizes, 'xs')),
            sm: getImageUrl(mobile, ...boxPx(sizes, 'sm')),
            md: getImageUrl(desktop, ...boxPx(sizes, 'md')),
            lg: getImageUrl(desktop, ...boxPx(sizes, 'lg'))
        };

    return (
        <div className={styles.container}>
            <Image sources={coverUrls} sizes={sizes} alt={alt} lang={lang} className={styles.image} />
        </div>
    );
}
