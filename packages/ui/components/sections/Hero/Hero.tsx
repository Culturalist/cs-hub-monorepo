import { Hero } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { localizeString } from "@cs/data/utils";
import { neatTextBreaks } from "@cs/globals/utils";
import { CardsManual } from "../../blocks";
import { Cover } from "../../blocks/Cover";
import Links from "../../blocks/Links";
import { createStyles } from "./Hero.styles";
import { SetPalette } from "@weresk/maket";
import { colorToRGB } from "@weresk/core";

interface HeroProps extends DefaultProps {
    data?: Hero;
}

export default function Hero(props: HeroProps) {
    const { data, lang, className } = props;
    if (!data) return null;

    const { covers, actionType, cards, links, coverOnHover, palette } = data;
    const lead = neatTextBreaks(localizeString(data.lead, lang));
    const styles = createStyles({ className, leadLength: lead.length });

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* LEAD */}
                {lead && (
                    <h1 className={styles.leadWrapper}>
                        <span className={styles.lead}>{lead}</span>
                    </h1>
                )}
                {/* ACTIONS */}
                {/* CARDS */}
                {actionType === "cards" && cards && (
                    <CardsManual
                        hero={true}
                        data={cards}
                        coverOnHover={coverOnHover}
                        lang={lang}
                        className={styles.cards}
                    />
                )}
                {(actionType === "links" || actionType === "buttons") && (
                    <Links links={links} layout={actionType} lang={lang} className={styles.links} />
                )}
            </div>
            <div className={styles.bg}>
                <Cover array={covers} parent="hero" lang={lang} className={styles.cover} />
            </div>

            <SetPalette selector=".hero" set={palette}>
                {palette
                    ? `.hero { --palette-on-surface: ${colorToRGB(palette.on_surface)}; --header-logo-lightness: ${
                          palette.on_surface.hsl.l
                      } }`
                    : undefined}
            </SetPalette>
        </div>
    );
}
