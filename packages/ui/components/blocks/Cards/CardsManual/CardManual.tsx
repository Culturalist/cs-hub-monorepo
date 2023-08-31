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
    data: CardManual[];
    coverOnHover?: boolean;
    hero?: boolean;
}

export default function CardManual(props: CardManualProps) {
    const { data, coverOnHover, hero, lang, className } = props;
    const styles = createStyles({ className, coverOnHover, hero });

    const sizes: AdaptiveDimentions = {
        xs: box(hero ? [12, 3] : [6, 4], 'xs'),
        sm: box([8, 5], 'sm'),
        md: box([8, 5], 'md'),
        lg: box([8, 5], 'lg')
    };

    return (
        <div className={styles.container}>
            {data.map((card, i) => {
                const { cover, link, cardSurface } = card;
                const title = neatTextBreaks(localizeString(card.title, lang));
                const subtitle = neatTextBreaks(localizeString(card.subtitle, lang));
                const coverUrls =
                    cover &&
                    mapKeys<Breakpoint, string>(breakpoints, (br: Breakpoint) =>
                        getImageUrl(cover, ...boxPx(sizes, br))
                    );
                return (
                    <LinkWrapper
                        link={link}
                        className={styles.card}
                        style={cardSurface ? { backgroundColor: cardSurface.hex } : undefined}
                        key={i}
                    >
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
                        <Image
                            sources={coverUrls}
                            sizes={sizes}
                            alt={card.title}
                            lang={lang}
                            className={styles.cover}
                        />
                    </LinkWrapper>
                );
            })}
        </div>
    );
}
