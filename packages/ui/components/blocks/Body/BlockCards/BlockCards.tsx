import { prepareCardsData } from 'data/utils';
import { BlockCards } from 'data/schemas';
import { DefaultProps } from 'globals';
import { createStyles } from './BlockCards.styles';
import { Cards } from '../../Cards';

interface BlockCardsProps extends DefaultProps {
    data: BlockCards;
}

export default async function BlockCards(props: BlockCardsProps) {
    const { data, lang, className } = props;
    const { type: cardsType, groupByLabel } = data;
    const cards = cardsType && data[cardsType];
    if (!cards || cards.length == 0) return null;

    const styles = createStyles({ className, cardsType });

    const unsorted = await prepareCardsData(cardsType, cards);

    // if (groupByLabel) {

    // }

    return <Cards data={unsorted} type={cardsType} lang={lang} className={styles.container} />;
}

// type: CardsType | 'hero';
// data?: Card[];
// coverOnHover?: boolean;
