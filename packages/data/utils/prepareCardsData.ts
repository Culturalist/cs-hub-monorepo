import { clientNext } from "../client";
import { blockCardsQuery, Card, CardSource, CardsType, cardsTypeList } from "../schemas/objects";
import { Label, Page } from "../schemas";

export async function prepareCardsData(cardsType: CardsType, input: (Card | Label | Page)[]): Promise<Card[]> {
    const output: Card[] = [];
    const docType = cardsTypeList.find(({ value }) => value === cardsType)?.docType;
    const needFetch = input.some((entry) => entry._type === "label" || entry._type === "page");
    if (cardsType === "manual" || !needFetch) {
        return input as Card[];
    }
    const data: CardSource[] = await clientNext.fetch(blockCardsQuery, {
        docType
    });

    input.forEach((entry) => {
        if (entry._type === "label") {
            data.forEach((card) => {
                card.labels?.map((label) => label._ref || label._id).includes(entry._ref || entry._id) &&
                    output.push(card);
            });
        } else if (entry._type === "page") {
            data.forEach((card) => {
                [card.parent?._ref || card.parent?._id].includes(entry._ref || entry._id) && output.push(card);
            });
        } else {
            output.push(entry as Card);
        }
    });

    return output;
}
