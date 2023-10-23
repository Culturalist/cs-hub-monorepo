import { localizeString } from "@cs/data/utils";
import { Organisation } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { getImageUrl } from "@cs/globals/lib/sanity";
import LinkWrapper from "../../LinkWrapper";
import { createStyles } from "./CardsOrganisations.styles";
import metrics from "../../../../metrics";

interface CardsOrganisationsProps extends DefaultProps {
    data: Organisation[];
}

export default function CardsOrganisations(props: CardsOrganisationsProps) {
    const { data, lang, className } = props;
    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {data.map((card, i) => {
                const { logo, url } = card;
                const name = localizeString(card.title, lang);
                const logoUrl =
                    logo && getImageUrl(logo, metrics.breakpoints.xs);
                return (
                    <LinkWrapper
                        href={url}
                        title={name}
                        className={styles.card}
                        key={i}
                    >
                        <img
                            src={logoUrl}
                            alt={name}
                            className={styles.image}
                        />
                    </LinkWrapper>
                );
            })}
        </div>
    );
}
