import { wrapReference, localizeString } from "@cs/data/utils";
import { Project } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { Body, Cover, Lineup, LinkWrapper } from "../../blocks";
import { createStyles } from "./ProjectLayout.styles";
import { hasLongWords } from "../../../utils";

interface ProjectLayoutProps extends DefaultProps {
    data: Project;
}

export default function ProjectLayout(props: ProjectLayoutProps) {
    const { data, lang, className } = props;
    const { covers, captionAlt, parent, body, organisations } = data;
    const title = localizeString(data.title, lang);
    const subtitle = localizeString(data.subtitle, lang);
    const label = localizeString(data.labels?.[0]?.title, lang);
    const styles = createStyles({ className });

    return (
        <>
            <main className={styles.container}>
                {/* CONNECTIONS */}
                {(parent || label) && (
                    <div className={styles.connections}>
                        {parent && (
                            <LinkWrapper link={wrapReference(parent)} lang={lang} className={styles.parentWrapper}>
                                <span className={styles.parent}>{localizeString(parent.title, lang)}</span>
                            </LinkWrapper>
                        )}
                        {label && (
                            <div className={styles.labelWrapper}>
                                <span className={styles.label}>{label}</span>
                            </div>
                        )}
                    </div>
                )}
                {/* TITLE */}
                <h1 data-hyphen={hasLongWords(title)} className={styles.titleWrapper}>
                    <span className={styles.title}>{title}</span>
                </h1>
                {/* SUBTITLE */}
                {subtitle && (
                    <h2 className={styles.subtitleWrapper}>
                        <span className={styles.subtitle}>{subtitle}</span>
                    </h2>
                )}
                {/* LINEUP */}
                <Lineup data={organisations} lang={lang} className={styles.organisations} />
                {/* COVER */}
                <Cover
                    array={covers}
                    parent="page"
                    caption={captionAlt?.caption}
                    alt={captionAlt?.alt}
                    lang={lang}
                    className={styles.cover}
                />
                {/* BODY */}
                <Body data={body} lang={lang} className={styles.body} />
            </main>
        </>
    );
}
