import { prepareCardsData } from 'data/utils';
import { BlockCards, CardManual, Event, Organisation, Person } from 'data/schemas';
import { DefaultProps } from 'globals';
import { createStyles } from './BlockCards.styles';
import { CardsManual, CardsPeople } from '../../Cards';
import CardsEvents from '../../Cards/CardsEvents';
import CardsOrganisations from '../../Cards/CardsOrganisations';

interface BlockCardsProps extends DefaultProps {
    data: BlockCards;
}

export default async function BlockCards(props: BlockCardsProps) {
    const { lang, className } = props;
    const { type: cardsType, includePerson, monochromePhoto, coverOnHover, displayDates } = props.data;
    const cards = cardsType && props.data[cardsType];
    const include = cardsType == 'people' ? includePerson : undefined;
    if (!cards || cards.length == 0) return null;

    const styles = createStyles({ className, cardsType });
    const containerProps = {
        lang: lang,
        className: styles.container
    };

    const data = await prepareCardsData(cardsType, cards);

    // MANUAL
    if (cardsType == 'manual')
        return <CardsManual data={data as CardManual[]} coverOnHover={coverOnHover} {...containerProps} />;
    // PEOPLE
    else if (cardsType == 'people')
        return (
            <CardsPeople data={data as Person[]} include={include} monochrome={monochromePhoto} {...containerProps} />
        );
    // EVENTS
    else if (cardsType == 'events')
        return <CardsEvents data={data as Event[]} displayDates={displayDates} {...containerProps} />;
    // ORGANISATIONS
    else if (cardsType == 'organisations')
        return <CardsOrganisations data={data as Organisation[]} {...containerProps} />;

    return null;
}
