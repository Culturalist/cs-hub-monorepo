import { BlockColumns } from 'data/schemas';
import { DefaultProps } from 'globals';
import PortableText from '../../PortableText';
import { createStyles } from './BlockColumns.styles';

interface BlockColumnsProps extends DefaultProps {
    data: BlockColumns;
}

export default function BlockColumns(props: BlockColumnsProps) {
    const { data, lang, className } = props;
    const { content } = data;
    if (!content || content.length == 0) return null;

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {content.map((column, i) => (
                <PortableText data={column} parent="column" lang={lang} className={styles.column} key={i} />
            ))}
        </div>
    );
}
