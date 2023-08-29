import { groq } from 'next-sanity';
import { clientNext } from 'globals/lib/sanity';
import { Card } from '../schemas';

const query = groq`*[_type == $docType && label._ref in $labels]{
    ...
}`;

export async function fetchCardsDataByLabels(docType: string, labels: string[]): Promise<Card[]> {
    const data: Card[] = await clientNext.fetch(query, { docType, labels });
    if (!data) return [];
    return data;
}
