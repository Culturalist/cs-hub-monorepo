import { Person } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { localizeString } from "@cs/data/utils";
import { LinkContact, PortableText } from "../../blocks";
import { createStyles } from "./PersonLayout.styles";
import { getImageUrl } from "@cs/globals/lib/sanity";
import { numeric } from "@weresk/core";
import { gridConfig } from "../../../maket";
import { hasLongWords } from "../../../utils";

interface PersonLayoutProps extends DefaultProps {
    data: Person;
}

export default function PersonLayout(props: PersonLayoutProps) {
    const { data, lang, className } = props;
    const { photo, contacts, description } = data;
    const name = localizeString(data.title, lang);
    const subtitle = localizeString(data.subtitle, lang);
    const caption = localizeString(data.photoCaption, lang);
    const photoUrl =
        photo &&
        getImageUrl(photo, ...new Array(2).fill(numeric(gridConfig.screens?.xs) * numeric(gridConfig.pd?.xs) * 2));
    const styles = createStyles({ className });

    return (
        <main className={styles.container}>
            {/* NAME */}
            <h1 data-hyphen={hasLongWords(name)} className={styles.nameWrapper}>
                <span className={styles.name}>{name}</span>
            </h1>
            {subtitle && (
                <p className={styles.subtitleWrapper}>
                    <span className={styles.subtitle}>{subtitle}</span>
                </p>
            )}
            <div className={styles.wrapper}>
                {/* PHOTO */}
                {photoUrl && (
                    <figure className={styles.photoWrapper}>
                        <img src={photoUrl} alt={name} className={styles.photo} />
                        {caption && (
                            <figcaption className={styles.captionWrapper}>
                                <span className={styles.caption}>{caption}</span>
                            </figcaption>
                        )}
                    </figure>
                )}
                <div className={styles.info}>
                    {/* DESCRIPTION */}
                    <PortableText data={description} parent="field" lang={lang} className={styles.description} />
                    {/* CONTACTS */}
                    {contacts && contacts.length > 0 && (
                        <div className={styles.contacts}>
                            {contacts.map((link, i) => (
                                <LinkContact link={link} lang={lang} key={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
