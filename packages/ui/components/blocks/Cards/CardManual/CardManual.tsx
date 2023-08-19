//@ts-ignore
import tailwindConfig from '../../../../tailwind.config';
import resolveConfig from 'tailwindcss/resolveConfig';
import { AdaptiveDimentions, box } from '../../../../utils';
import { CardManual } from 'data/schemas';
import { DefaultProps } from 'globals';
import { getImageUrl } from 'globals/lib/sanity';
import { localizeString, neatTextBreaks } from 'weresk/utils';
import { createStyles } from './CardManual.styles';
import LinkWrapper from '../../LinkWrapper';

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
        sm: box([6, 4]),
        md: box([6, 4]),
        lg: box([8, 5])
    };

    const coverUrls = cover && {
        sm: getImageUrl(cover, ...sizes.sm.map(s => s * 3)),
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
                        srcSet={coverUrls.sm}
                        media={`(max-width: ${resolveConfig(tailwindConfig).theme.screens?.['max-md'].max})`}
                        width={sizes.sm[0]}
                        height={sizes.sm[1]}
                    />
                    <source
                        srcSet={coverUrls.md}
                        media={`(max-width: ${resolveConfig(tailwindConfig).theme.screens?.['max-lg'].max})`}
                        width={sizes.md[0]}
                        height={sizes.md[1]}
                    />
                    <img role="img" src={coverUrls.lg} width={sizes.lg[0]} height={sizes.lg[1]} alt={title} />
                </picture>
            )}
        </LinkWrapper>
    );
}
