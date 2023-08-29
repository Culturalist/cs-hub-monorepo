import { groq } from 'next-sanity';
import { clientNext } from 'globals/lib/sanity';
import { CardSource } from '../schemas';

const query = groq`*[_type == $docType]{
    ...
}`;

export async function fetchCardsDataByLabels(docType: string, labels: string[]): Promise<CardSource[]> {
    const data: CardSource[] = await clientNext.fetch(query, { docType });
    if (!data) return [];
    let filtered: CardSource[] = [];
    labels.forEach(labelId => {
        data.forEach(card => {
            card.labels?.map(label => label._ref || label._id).includes(labelId) && filtered.push(card);
        });
    });
    return filtered;
}
