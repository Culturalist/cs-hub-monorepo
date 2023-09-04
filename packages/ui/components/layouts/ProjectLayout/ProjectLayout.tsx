import { wrapReference } from 'data/utils';
import { Project } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString } from 'data/utils';
import { Body, Cover, LinkWrapper } from '../../blocks';
import { createStyles } from './ProjectLayout.styles';

interface ProjectLayoutProps extends DefaultProps {
    data: Project;
}

export default function ProjectLayout(props: ProjectLayoutProps) {
    const { data, lang, className } = props;
    const { covers, parent, body } = data;
    const title = localizeString(data.title, lang);
    const subtitle = localizeString(data.subtitle, lang);
    const label = localizeString(data.labels?.[0]?.title, lang);
    const styles = createStyles({ className });

    console.log(parent);

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
                <h1 className={styles.title}>
                    <span>{title}</span>
                </h1>
                {/* SUBTITLE */}
                {subtitle && (
                    <h2 className={styles.subtitleWrapper}>
                        <span className={styles.subtitle}>{subtitle}</span>
                    </h2>
                )}
                {/* LINEUP */}
                {/* <EventLineup data={lineup} lang={lang} className={styles.lineup} /> */}
                {/* COVER */}
                <Cover array={covers} parent="page" lang={lang} className={styles.cover} />
                {/* BODY */}
                <Body data={body} lang={lang} className={styles.body} />
            </main>
        </>
    );
}
