import { wrapReference } from 'data/utils';
import { Event } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString } from 'data/utils';
import { Body, Cover, Links, LinkWrapper, EventDates, Lineup } from '../../blocks';
import { createStyles } from './EventLayout.styles';
import { getPageVariables } from '../../../utils';

interface EventLayoutProps extends DefaultProps {
    data: Event;
}

export default function EventLayout(props: EventLayoutProps) {
    const { data, lang, className } = props;
    const { covers, lineup, dates, action, parent, body, theme } = data;
    const title = localizeString(data.title, lang);
    const subtitle = localizeString(data.subtitle, lang);
    const label = localizeString(data.labels?.[0]?.title, lang);
    const styles = createStyles({ className });

    return (
        <>
            <main className={styles.container}>
                {/* CONNECTIONS */}
                {(parent || label) && (
                    <div className={styles.connections}>
                        {parent && (
                            <LinkWrapper link={wrapReference(parent)} lang={lang} className={styles.parentWrapper}>
                                <span className={styles.parent}>{localizeString(parent.title, lang)}</span>
                            </LinkWrapper>
                        )}
                        {label && (
                            <div className={styles.labelWrapper}>
                                <span className={styles.label}>{label}</span>
                            </div>
                        )}
                    </div>
                )}
                {/* TITLE */}
                <h1 className={styles.title}>
                    <span>{title}</span>
                </h1>
                {/* SUBTITLE */}
                {subtitle && (
                    <h2 className={styles.subtitleWrapper}>
                        <span className={styles.subtitle}>{subtitle}</span>
                    </h2>
                )}
                {/* LINEUP */}
                <Lineup data={lineup} lang={lang} className={styles.lineup} />
                {/* DATES & ACTION */}
                <div className={styles.datesWrapper}>
                    <EventDates data={dates} lang={lang} className={styles.dates} />
                    {action && <Links links={[action]} layout="buttons" lang={lang} className={styles.action} />}
                </div>
                {/* COVER */}
                <Cover array={covers} parent="page" lang={lang} className={styles.cover} />
                {/* BODY */}
                <Body data={body} lang={lang} className={styles.body} />
            </main>
            {theme && <style>{getPageVariables(theme)}</style>}
        </>
    );
}
