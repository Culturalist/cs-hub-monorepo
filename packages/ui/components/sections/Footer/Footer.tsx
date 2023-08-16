import { Footer } from 'data/schemas/sections';
import { DefaultProps, Locale } from 'globals';
import { createStyles } from './Footer.styles';

interface FooterProps extends DefaultProps {
    data: Footer;
    lang: Locale;
}

export default function Footer(props: FooterProps) {
    const { data, lang, className } = props;
    const styles = createStyles({ className });

    return (
        <footer className={styles.container}>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </footer>
    );
}
