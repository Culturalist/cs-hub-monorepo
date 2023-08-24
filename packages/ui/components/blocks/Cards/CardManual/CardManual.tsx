import { AdaptiveDimentions, box } from '../../../../utils';
import { CardManual } from 'data/schemas';
import { DefaultProps } from 'globals';
import { getImageUrl } from 'globals/lib/sanity';
import { localizeString, neatTextBreaks } from 'weresk/utils';
import { createStyles } from './CardManual.styles';
import LinkWrapper from '../../LinkWrapper';
import globalConfig from 'globals/globalConfig';
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

    const coverUrls = cover && {
        xs: getImageUrl(cover, ...sizes.xs.map(s => s * 2)),
        sm: getImageUrl(cover, ...sizes.sm.map(s => s * 2)),
        md: getImageUrl(cover, ...sizes.md.map(s => s * 2)),
        lg: getImageUrl(cover, ...sizes.lg.map(s => s * 2))
    };

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
