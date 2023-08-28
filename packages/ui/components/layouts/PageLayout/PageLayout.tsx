import { Page } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString } from 'data/utils';
import { getPageVariables } from '../../../utils';
import { Body, Cover, PageIndex } from '../../blocks';
import { createStyles } from './PageLayout.styles';

interface PageLayoutProps extends DefaultProps {
    data: Page;
}

export default function PageLayout(props: PageLayoutProps) {
    const { data, lang, className } = props;
    const { covers, index, body, theme } = data;
    const title = localizeString(data.title, lang);
    const styles = createStyles({ className });

    return (
        <>
            <main className={styles.container}>
                <h1 className={styles.title}>
                    <span>{title}</span>
                </h1>
                {/* INDEX */}
                {index && <PageIndex body={body} lang={lang} className={styles.index} />}
                {/* COVER */}
                <Cover array={covers} parent="page" lang={lang} className={styles.cover} />
                {/* BODY */}
                <Body data={body} lang={lang} className={styles.body} />
            </main>
            {theme && <style>{getPageVariables(theme)}</style>}
        </>
    );
}
