import { localizeString } from "@cs/data/utils";
import { LinkCaptioned, Organisation, OrganizationCardLayout } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { getImageUrl } from "@cs/globals/lib/sanity";
import { LinkWrapper } from "../../LinkWrapper";
import { createStyles } from "./CardsOrganisations.styles";
import { numeric } from "@weresk/core";
import { gridConfig } from "../../../../maket";
import { Links } from "../../Links";

interface CardsOrganisationsProps extends DefaultProps {
    data: Organisation[];
    layout?: OrganizationCardLayout;
}

export default function CardsOrganisations(props: CardsOrganisationsProps) {
    const { data, layout = "logos", lang, className } = props;
    const styles = createStyles({ className });

    // Logos
    if (layout === "logos")
        return (
            <div className={styles.container}>
                {data.map((card, i) => {
                    const { logo, url } = card;
                    const name = localizeString(card.title, lang);
                    const logoUrl = logo && getImageUrl(logo, numeric(gridConfig.screens?.xs));
                    return (
                        <LinkWrapper href={url} title={name} className={styles.card} key={i}>
                            <img src={logoUrl} alt={name} className={styles.image} />
                        </LinkWrapper>
                    );
                })}
            </div>
        );

    // List
    const links: LinkCaptioned[] = data.map((organisation, i) => ({
        _type: "linkCaptioned",
        _key: organisation._key,
        caption: organisation.title,
        link: {
            _type: "linkTyped",
            type: "external",
            href: organisation.url
        }
    }));

    return <Links links={links} layout="list" lang={lang} className={styles.list} />;
}
