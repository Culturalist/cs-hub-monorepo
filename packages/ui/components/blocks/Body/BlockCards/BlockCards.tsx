import { prepareCardsData } from "@cs/data/utils";
import {
    BlockCards,
    CardManual,
    Event,
    Organisation,
    Person,
    Post,
    Project
} from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { createStyles } from "./BlockCards.styles";
import {
    CardsManual,
    CardsPeople,
    CardsPosts,
    CardsProjects
} from "../../Cards";
import CardsEvents from "../../Cards/CardsEvents";
import CardsOrganisations from "../../Cards/CardsOrganisations";

interface BlockCardsProps extends DefaultProps {
    data: BlockCards;
}

export default async function BlockCards(props: BlockCardsProps) {
    const { lang, className } = props;
    const {
        type: cardsType,
        includePerson,
        monochromePhoto,
        coverOnHover,
        displayDates,
        showLabels
    } = props.data;
    const cards = props.data[cardsType];
    const include = cardsType === "people" ? includePerson : undefined;
    if (!cards || cards.length === 0) return null;

    const styles = createStyles({ className, cardsType });
    const containerProps = {
        lang,
        className: styles.container
    };

    const data = await prepareCardsData(cardsType, cards);

    // MANUAL
    if (cardsType === "manual")
        return (
            <CardsManual
                data={data as CardManual[]}
                coverOnHover={coverOnHover}
                {...containerProps}
            />
        );
    // PEOPLE
    else if (cardsType === "people")
        return (
            <CardsPeople
                data={data as Person[]}
                include={include}
                monochrome={monochromePhoto}
                {...containerProps}
            />
        );
    // EVENTS
    else if (cardsType === "events")
        return (
            <CardsEvents
                data={data as Event[]}
                displayDates={displayDates}
                {...containerProps}
            />
        );
    // PROJECTS
    else if (cardsType === "projects")
        return (
            <CardsProjects
                data={data as Project[]}
                showLabels={showLabels}
                {...containerProps}
            />
        );
    // PROJECTS
    else if (cardsType === "posts")
        return <CardsPosts data={data as Post[]} {...containerProps} />;
    // ORGANISATIONS
    return (
        <CardsOrganisations data={data as Organisation[]} {...containerProps} />
    );
}
