import { AdaptiveDimentions, box } from '../../../../utils';
import { CardManual } from 'data/schemas';
import { DefaultProps } from 'globals';
import { getImageUrl } from 'globals/lib/sanity';
import { localizeString, neatTextBreaks } from 'weresk/utils';
import { createStyles } from './CardManual.styles';
import LinkWrapper from '../../LinkWrapper';
import globalConfig from 'globals/globalConfig';

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
        md: getImageUrl(cover, ...sizes.sm.map(s => s * 2)),
        lg: getImageUrl(cover, ...sizes.sm.map(s => s * 2))
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
            {coverUrls && (
                <picture className={styles.cover}>
                    <source
                        srcSet={coverUrls.xs}
                        media={`(max-width: ${globalConfig.breakpoints.sm - 1})`}
                        width={sizes.xs[0]}
                        height={sizes.xs[1]}
                    />
                    <source
                        srcSet={coverUrls.sm}
                        media={`(max-width: ${globalConfig.breakpoints.md - 1})`}
                        width={sizes.sm[0]}
                        height={sizes.sm[1]}
                    />
                    <source
                        srcSet={coverUrls.md}
                        media={`(max-width: ${globalConfig.breakpoints.lg - 1})`}
                        width={sizes.md[0]}
                        height={sizes.md[1]}
                    />
                    <img role="img" src={coverUrls.lg} width={sizes.lg[0]} height={sizes.lg[1]} alt={title} />
                </picture>
            )}
        </LinkWrapper>
    );
}
