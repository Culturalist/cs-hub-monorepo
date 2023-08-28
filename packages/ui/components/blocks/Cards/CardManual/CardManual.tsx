import { AdaptiveDimentions, box, boxPx, breakpoints } from '../../../../utils';
import { CardManual } from 'data/schemas';
import { Breakpoint, DefaultProps } from 'globals';
import { getImageUrl } from 'globals/lib/sanity';
import { localizeString } from 'data/utils';
import { mapKeys, neatTextBreaks } from 'weresk/utils';
import { createStyles } from './CardManual.styles';
import LinkWrapper from '../../LinkWrapper';
import Image from '../../Image';

interface CardManualProps extends DefaultProps {
    data: CardManual;
    coverOnHover?: boolean;
}

export default function CardManual(props: CardManualProps) {
    const { data, coverOnHover, lang, className } = props;
    const { cover, link, cardSurface } = data;
    const title = neatTextBreaks(localizeString(data.title, lang));
    const subtitle = neatTextBreaks(localizeString(data.subtitle, lang));

    const sizes: AdaptiveDimentions = {
        xs: box([6, 4], 'xs'),
        sm: box([8, 5], 'sm'),
        md: box([8, 5], 'md'),
        lg: box([8, 5], 'lg')
    };

    const coverUrls =
        cover && mapKeys<Breakpoint, string>(breakpoints, (br: Breakpoint) => getImageUrl(cover, ...boxPx(sizes, br)));

    const styles = createStyles({ className, cardSurface, coverOnHover });

    return (
        <LinkWrapper link={link} className={styles.container} style={styles.cardSurface}>
            <div className={styles.content}>
                {title && (
                    <h4 className={styles.titleWrapper}>
                        <span className={styles.title}>{title}</span>
                    </h4>
                )}
                {subtitle && (
                    <p className={styles.subtitleWrapper}>
                        <span className={styles.subtitle}>{subtitle}</span>
                    </p>
                )}
            </div>
            <Image sources={coverUrls} sizes={sizes} alt={data.title} lang={lang} className={styles.cover} />
        </LinkWrapper>
    );
}
