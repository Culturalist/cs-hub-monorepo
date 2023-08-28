import { Hero } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString } from 'data/utils';
import { neatTextBreaks } from 'weresk/utils';
import { getHeroVariables } from '../../../utils';
import { Cards } from '../../blocks';
import { Cover } from '../../blocks/Cover';
import Links from '../../blocks/Links';
import { createStyles } from './Hero.styles';

interface HeroProps extends DefaultProps {
    data?: Hero;
}

export default function Hero(props: HeroProps) {
    const { data, lang, className } = props;
    if (!data) return null;

    const { covers, actionType, cards, links, coverOnHover, theme } = data;
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
                {actionType == 'cards' && (
                    <Cards data={cards} type="hero" coverOnHover={coverOnHover} lang={lang} className={styles.cards} />
                )}
                {(actionType == 'links' || actionType == 'buttons') && (
                    <Links links={links} layout={actionType} lang={lang} className={styles.links} />
                )}
            </div>
            <div className={styles.bg}>
                <Cover array={covers} parent="hero" lang={lang} className={styles.cover} />
            </div>
            {theme && <style>{getHeroVariables(theme)}</style>}
        </div>
    );
}
