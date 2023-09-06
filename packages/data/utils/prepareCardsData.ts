import { groq } from 'next-sanity';
import { clientNext } from 'globals/lib/sanity';
import { Card, CardSource } from '../schemas/objects';
import { Label } from '../schemas/system';
import { CardsType, cardsTypeList } from '../schemas/values';
import globalConfig from 'globals/globalConfig';
import { Page } from '../schemas';

const query = groq`*[_type == $docType] | order(date desc, title.${globalConfig.localization.default} asc){
    ...,
    labels[]->,
    author->
}`;

export async function prepareCardsData(cardsType: CardsType, input: (Card | Label | Page)[]): Promise<Card[]> {
    let output: Card[] = [];
    const docType = cardsTypeList.find(({ value }) => value == cardsType)?.docType;
    const needFetch = input.some(entry => entry._type == 'label' || entry._type == 'page');
    if (cardsType == 'manual' || !needFetch) {
        return input as Card[];
    }
    const data: CardSource[] = await clientNext.fetch(query, { docType });

    input.forEach(entry => {
        if (entry._type == 'label') {
            data.forEach(card => {
                card.labels?.map(label => label._ref || label._id).includes(entry._ref || entry._id) &&
                    output.push(card);
            });
        } else if (entry._type == 'page') {
            data.forEach(card => {
                [entry._id, entry._ref].includes(card.parent?._ref || card.parent?._id) && output.push(card);
            });
        } else {
            output.push(entry as Card);
        }
    });

    return output;
}
