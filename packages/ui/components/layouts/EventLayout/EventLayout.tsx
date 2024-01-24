import { SetPalette } from "@weresk/maket";
import { DefaultProps } from "@cs/globals";
import { wrapReference, localizeString } from "@cs/data/utils";
import { Event } from "@cs/data/schemas";
import { Body, Cover, Links, LinkWrapper, EventDates, Lineup } from "../../blocks";
import { createStyles } from "./EventLayout.styles";
import { hasLongWords } from "../../../utils";

interface EventLayoutProps extends DefaultProps {
    data: Event;
}

export default function EventLayout(props: EventLayoutProps) {
    const { data, lang, className } = props;
    const { covers, captionAlt, lineup, dates, action, parent, body, palette } = data;
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
                <h1 data-hyphen={hasLongWords(title)} className={styles.titleWrapper}>
                    <span className={styles.title}>{title}</span>
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
                <Cover
                    array={covers}
                    parent="page"
                    caption={captionAlt?.caption}
                    alt={captionAlt?.alt}
                    lang={lang}
                    className={styles.cover}
                />
                {/* BODY */}
                <Body data={body} lang={lang} className={styles.body} />
            </main>
            <SetPalette selector="body" set={palette}>
                {palette?.on_surface
                    ? `header { --header-logo-lightness: ${palette.on_surface.hsl.l} } footer { --footer-logo-lightness: ${palette.on_surface_light.hsl.l} }`
                    : undefined}
            </SetPalette>
        </>
    );
}
