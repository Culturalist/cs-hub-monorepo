import { Card, CardPart, CardsType } from 'data/schemas';
import { DefaultProps } from 'globals';
import CardHero from './CardHero';
import CardManual from './CardManual';
import CardPerson from './CardPerson';
import { createStyles } from './Cards.styles';

interface CardsProps extends DefaultProps {
    type: CardsType | 'hero';
    data?: Card[];
    coverOnHover?: boolean;
    include?: CardPart[];
}

export default function Cards(props: CardsProps) {
    const { type, data, coverOnHover, include, lang, className } = props;
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
                    return <CardPerson data={card} include={include} lang={lang} key={i} />;
            })}
        </div>
    );
}
