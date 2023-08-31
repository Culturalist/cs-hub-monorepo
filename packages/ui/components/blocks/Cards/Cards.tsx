import { Card, CardPart, CardsType } from 'data/schemas';
import { DefaultProps } from 'globals';
import CardHero from './CardHero';
import CardManual from './CardManual';
import CardOrganisation from './CardOrganisation';
import CardPerson from './CardPerson';
import { createStyles } from './Cards.styles';

interface CardsProps extends DefaultProps {
    type: CardsType | 'hero';
    data?: Card[];
    coverOnHover?: boolean;
    include?: CardPart[];
    monochrome?: boolean;
}

export default function Cards(props: CardsProps) {
    const { type, data, coverOnHover, monochrome, include, lang, className } = props;
    if (!data || data.length == 0) return null;

    const styles = createStyles({ className, type });

    return (
        <div className={styles.container}>
            {data.map((card, i) => {
                if (type == 'manual' && card._type == 'cardManual')
                    return <CardManual data={card} coverOnHover={coverOnHover} lang={lang} key={i} />;
                else if (type == 'hero' && card._type == 'cardManual')
                    return <CardHero data={card} coverOnHover={coverOnHover} lang={lang} key={i} />;
                else if (type == 'people' && card._type == 'person')
                    return <CardPerson data={card} include={include} monochrome={monochrome} lang={lang} key={i} />;
                else if (type == 'organisations' && card._type == 'organisation')
                    return <CardOrganisation data={card} lang={lang} key={i} />;
            })}
        </div>
    );
}
