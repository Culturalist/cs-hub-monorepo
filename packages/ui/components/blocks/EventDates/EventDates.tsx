import { ElementDate } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { formatLocaleDate, localizeString } from "@cs/data/utils";
import { LinkWrapper } from "../LinkWrapper";
import { createStyles } from "./EventDates.styles";

interface EventDatesProps extends DefaultProps {
    data?: ElementDate[];
}

export default function EventDates(props: EventDatesProps) {
    const { data, lang, className } = props;
    if (!data || data.length === 0) return null;

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {data.map((event, i) => {
                const { start, end, mapUrl } = event;
                const date = formatLocaleDate(event.date, lang);
                const location = localizeString(event.location, lang);
                return (
                    <div className={styles.event} key={i}>
                        {date && (
                            <p className={styles.dateWrapper}>
                                <span className={styles.date}>{date}</span>
                            </p>
                        )}
                        <p className={styles.details}>
                            {start || end ? (
                                <span className={styles.time}>
                                    {start || ""}
                                    {end ? <span>&#8212;</span> : ""}
                                    {end ? end : ""}
                                </span>
                            ) : null}
                            {location && (
                                <LinkWrapper
                                    href={mapUrl}
                                    className={mapUrl ? styles.locationLink : styles.locationWrapper}
                                >
                                    <span className={styles.location}>{location}</span>
                                </LinkWrapper>
                            )}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}
