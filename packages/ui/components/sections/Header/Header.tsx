import { Header } from 'data/schemas/sections';
import { DefaultProps, Locale } from 'globals';
import { createStyles } from './Header.styles';

interface HeaderProps extends DefaultProps {
    data: Header;
    lang: Locale;
}

export default function Header(props: HeaderProps) {
    const { data, lang, className } = props;
    const styles = createStyles({ className });

    return (
        <header className={styles.container}>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </header>
    );
}
