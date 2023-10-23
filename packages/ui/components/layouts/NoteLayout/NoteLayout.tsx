import { formatLocaleDate, localizeString } from "@cs/data/utils";
import { Note } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { Body, Cover } from "../../blocks";
import { createStyles } from "./NoteLayout.styles";

interface NoteLayoutProps extends DefaultProps {
    data: Note;
}

export default function NoteLayout(props: NoteLayoutProps) {
    const { data, lang, className } = props;
    const { covers, captionAlt, body } = data;
    const title = localizeString(data.title, lang);
    const date = formatLocaleDate(data.date, lang, true);
    const styles = createStyles({ className });

    return (
        <>
            <main className={styles.container}>
                {/* DATE */}
                {date && (
                    <p className={styles.dateWrapper}>
                        <span className={styles.date}>{date}</span>
                    </p>
                )}
                {/* TITLE */}
                <h1 className={styles.titleWrapper}>
                    <span className={styles.title}>{title}</span>
                </h1>
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
