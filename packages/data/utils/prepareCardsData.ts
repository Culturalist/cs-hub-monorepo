import { Card } from '../schemas/objects';
import { Label } from '../schemas/system';
import { CardsType, cardsTypeList } from '../schemas/values';
import { fetchCardsDataByLabels } from './fetchCardsDataByLabels';

export async function prepareCardsData(cardsType: CardsType, input: (Card | Label)[]): Promise<Card[]> {
    if (cardsType == 'manual') {
        return input as Card[];
    }
    const docType = cardsTypeList.find(({ value }) => value == cardsType)?.docType;
    let output: Card[] = [];
    let labels: string[] = [];

    input.forEach(entry => {
        if (entry._type == 'label') {
            labels.push(entry._ref || entry._id);
        } else if (entry._type == docType) {
            output.push(entry as Card);
        }
    });

    if (labels.length > 0 && docType) {
        const cardsByLabels: Card[] = await fetchCardsDataByLabels(docType, labels);
        output = [...output, ...cardsByLabels];
    }

    return output;
}
