import { BodyBlock } from 'data';
import { DefaultProps, Locale } from 'globals';
import { createStyles } from './Base.styles';

interface BaseProps extends DefaultProps {
    data: BodyBlock[];
    lang: Locale;
}

export default function Base(props: BaseProps) {
    const { data, lang, className } = props;
    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
}
