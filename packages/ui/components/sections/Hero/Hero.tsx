import { Hero } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString, neatTextBreaks } from 'weresk/utils';
import { getHeroVariables } from '../../../utils';
import { Cards } from '../../blocks';
import { createStyles } from './Hero.styles';

interface HeroProps extends DefaultProps {
    data?: Hero;
}

export default function Hero(props: HeroProps) {
    const { data, lang, className } = props;
    if (!data) return null;

    const { covers, actionType, cards, links, theme } = data;
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
                {actionType == 'cards' && <Cards data={cards} type="hero" lang={lang} className={styles.cards} />}
            </div>
            <div className={styles.bg}></div>
            {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
            <style>{getHeroVariables(theme)}</style>
        </div>
    );
}
