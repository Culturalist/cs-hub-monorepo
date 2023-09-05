import { groq } from 'next-sanity';
import { clientNext } from 'globals/lib/sanity';
import { Card, CardSource } from '../schemas/objects';
import { Label } from '../schemas/system';
import { CardsType, cardsTypeList } from '../schemas/values';
import globalConfig from 'globals/globalConfig';

const query = groq`*[_type == $docType] | order(date desc, title.${globalConfig.localization.default} asc){
    ...,
    labels[]->
}`;

export async function prepareCardsData(cardsType: CardsType, input: (Card | Label)[]): Promise<Card[]> {
    const hasLabels = input.some(entry => entry._type == 'label');
    if (cardsType == 'manual' || !hasLabels) {
        return input as Card[];
    }
    const docType = cardsTypeList.find(({ value }) => value == cardsType)?.docType;
    const data: CardSource[] = await clientNext.fetch(query, { docType });
    let output: Card[] = [];

    input.forEach(entry => {
        if (entry._type == 'label') {
            data.forEach(card => {
                card.labels?.map(label => label._ref || label._id).includes(entry._ref || entry._id) &&
                    output.push(card);
            });
        } else {
            output.push(entry as Card);
        }
    });

    return output;
}
