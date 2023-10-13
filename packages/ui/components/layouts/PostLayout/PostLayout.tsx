import { formatLocaleDate, wrapReference, localizeString } from 'data/utils';
import { Post } from 'data/schemas';
import { DefaultProps } from 'globals';
import { Body, Cover, LinkWrapper } from '../../blocks';
import { createStyles } from './PostLayout.styles';

interface PostLayoutProps extends DefaultProps {
    data: Post;
}

export default function PostLayout(props: PostLayoutProps) {
    const { data, lang, className } = props;
    const { covers, coverCaption, parent, body } = data;
    const title = localizeString(data.title, lang);
    const subtitle = localizeString(data.subtitle, lang);
    const label = localizeString(data.labels?.[0]?.title, lang);
    const date = formatLocaleDate(data.date, lang, true);
    const author = localizeString(data.author?.title, lang);
    const styles = createStyles({ className });

    return (
        <>
            <main className={styles.container}>
                <div className={styles.connectionsWrapper}>
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
                    <div className={styles.details}>
                        {/* AUTHOR */}
                        {author && (
                            <div className={styles.authorWrapper}>
                                <span className={styles.author}>{author}</span>
                            </div>
                        )}
                        {/* DATE */}
                        {date && (
                            <p className={styles.dateWrapper}>
                                <span className={styles.date}>{date}</span>
                            </p>
                        )}
                    </div>
                </div>
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
                {/* COVER */}
                <Cover array={covers} parent="page" caption={coverCaption} lang={lang} className={styles.cover} />
                {/* BODY */}
                <Body data={body} lang={lang} className={styles.body} />
            </main>
        </>
    );
}
