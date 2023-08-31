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
    const { type: cardsType, groupByLabel, includePerson, monochromePhoto } = data;
    const cards = cardsType && data[cardsType];
    const include = cardsType == 'people' ? includePerson : undefined;
    if (!cards || cards.length == 0) return null;

    const styles = createStyles({ className, cardsType });

    const unsorted = await prepareCardsData(cardsType, cards);

    return (
        <Cards
            data={unsorted}
            type={cardsType}
            include={include}
            monochrome={monochromePhoto}
            lang={lang}
            className={styles.container}
        />
    );
}
