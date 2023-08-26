import { BlockSection } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString, neatTextBreaks } from 'weresk';
import Body from '../Body';
import { createStyles } from './BlockSection.styles';

interface BlockSectionProps extends DefaultProps {
    data: BlockSection;
}

export default function BlockSection(props: BlockSectionProps) {
    const { data, lang, className } = props;
    const { content } = data;
    const title = neatTextBreaks(localizeString(data.title, lang));
    const id = data.blockId?.current;
    const styles = createStyles({ className });

    return (
        <section id={id} className={styles.container}>
            {title && (
                <h2 className={styles.titleWrapper}>
                    <span className={styles.title}>{title}</span>
                </h2>
            )}
            <Body data={content} lang={lang} className={styles.content} />
        </section>
    );
}
