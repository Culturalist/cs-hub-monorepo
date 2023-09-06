import { elementToDate, formatLocaleDate, localizeString, selectDate, wrapReference } from 'data/utils';
import { CoverBlock, Event } from 'data/schemas';
import { DefaultProps } from 'globals';
import { createStyles } from './CardsEvents.styles';
import LinkWrapper from '../../LinkWrapper';
import { box, BoxDimentions } from '../../../../utils';
import { getImageUrl } from 'globals/lib/sanity';
import metrics from '../../../../metrics';

interface CardsEventsProps extends DefaultProps {
    data: Event[];
    displayDates?: boolean;
}

export default function CardsEvents(props: CardsEventsProps) {
    const { displayDates, lang, className } = props;
    let data = props.data;
    const styles = createStyles({ className });

    const coverSize = box([12, 8], 'lg').map(s => s * metrics.pd.lg) as BoxDimentions;

    //If display separate dates, duplicate events with multiple dates and add single date in each copy
    if (displayDates) {
        let unsorted: Event[] = [];
        data.forEach(event => {
            if (event.dates && event.dates.length > 1) {
                event.dates.forEach(date => {
                    unsorted.push({
                        ...event,
                        dates: [date]
                    });
                });
            } else {
                unsorted.push(event);
            }
        });
        data = unsorted;
    }

    //Sort cards by earliest of dates;
    data.sort((a, b) => {
        if (a.dates && b.dates) {
            const minDateA = selectDate(a.dates, 'min');
            const minDateB = selectDate(b.dates, 'min');
            if (minDateA && minDateB) return elementToDate(minDateA) > elementToDate(minDateB) ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className={styles.container}>
            {data.map((card, i) => {
                const { dates, covers, cardSurface } = card;
                const title = localizeString(card.title, lang);
                const subtitle = localizeString(card.subtitle, lang);
                const minDate = dates && selectDate(dates, 'min');
                const time = minDate ? `${minDate.start || ''}${minDate.end ? '-' + minDate.end : ''}` : '';
                const maxDate = dates && dates.length > 1 && selectDate(dates, 'max');
                const lineup = card.lineup?.[0]?.list;
                const showLineup = lineup && lineup.length > 0;
                let cover: CoverBlock | undefined;

                covers &&
                    covers.length > 0 &&
                    covers.every(nextCover => {
                        if (nextCover._type == 'coverImage') {
                            cover = nextCover;
                        }
                        return !(cover && nextCover.useMedia?.includes('desktop'));
                    });

                const coverUrl = cover && getImageUrl(cover, ...coverSize);

                return (
                    <LinkWrapper link={wrapReference(card)} lang={lang} className={styles.card} key={i}>
                        <div
                            className={styles.wrapper}
                            style={cardSurface ? { backgroundColor: cardSurface.hex } : undefined}
                        >
                            {/* DATES */}
                            <div className={styles.dates}>
                                {minDate && (
                                    <p className={styles.startWrapper}>
                                        <span className={styles.start}>{formatLocaleDate(minDate.date)}</span>
                                    </p>
                                )}
                                {maxDate ? (
                                    <div className={styles.lineWrapper}>
                                        <div className={styles.line}></div>
                                        <p className={styles.endWrapper}>
                                            <span className={styles.end}>{formatLocaleDate(maxDate.date)}</span>
                                        </p>
                                    </div>
                                ) : (
                                    time && (
                                        <p className={styles.timeWrapper}>
                                            <span className={styles.time}>{time}</span>
                                        </p>
                                    )
                                )}
                            </div>
                            <div className={styles.info}>
                                {/* TITLE */}
                                {title && (
                                    <h4 className={styles.titleWrapper}>
                                        <span className={styles.title}>{title}</span>
                                    </h4>
                                )}
                                {/* LINEUP */}
                                {showLineup && (
                                    <div className={styles.lineup}>
                                        {lineup.map((person, i) => {
                                            const name = localizeString(person.title, lang);
                                            return name ? (
                                                <p className={styles.nameWrapper} key={i}>
                                                    <span className={styles.name}>{name}</span>
                                                </p>
                                            ) : null;
                                        })}
                                    </div>
                                )}
                                {/* SUBTITLE */}
                                {subtitle && !showLineup && (
                                    <h4 className={styles.subtitleWrapper}>
                                        <span className={styles.subtitle}>{subtitle}</span>
                                    </h4>
                                )}
                            </div>
                        </div>
                        {/* COVER */}
                        {coverUrl ? (
                            <img src={coverUrl} alt={title} className={styles.cover} />
                        ) : (
                            <div className={styles.box}></div>
                        )}
                    </LinkWrapper>
                );
            })}
        </div>
    );
}
