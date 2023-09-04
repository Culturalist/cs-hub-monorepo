import { Person } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString } from 'data/utils';
import { LinkContact, PortableText } from '../../blocks';
import { createStyles } from './PersonLayout.styles';
import { getImageUrl } from 'globals/lib/sanity';
import metrics from '../../../metrics';

interface PersonLayoutProps extends DefaultProps {
    data: Person;
}

export default function PersonLayout(props: PersonLayoutProps) {
    const { data, lang, className } = props;
    const { photo, contacts, description } = data;
    const name = localizeString(data.title, lang);
    const subtitle = localizeString(data.subtitle, lang);
    const photoUrl = photo && getImageUrl(photo, ...new Array(2).fill(metrics.breakpoints.xs * metrics.pd.xs * 2));
    const styles = createStyles({ className });

    return (
        <main className={styles.container}>
            {/* NAME */}
            <h1 className={styles.name}>
                <span>{name}</span>
            </h1>
            {subtitle && (
                <p className={styles.subtitleWrapper}>
                    <span className={styles.subtitle}>{subtitle}</span>
                </p>
            )}
            <div className={styles.wrapper}>
                {/* PHOTO */}
                {photoUrl && <img src={photoUrl} alt={name} className={styles.photo} />}
                <div className={styles.info}>
                    {/* DESCRIPTION */}
                    <PortableText data={description} parent="field" lang={lang} className={styles.description} />
                    {/* CONTACTS */}
                    {contacts && contacts.length > 0 && (
                        <div className={styles.contacts}>
                            {contacts.map((link, i) => (
                                <LinkContact link={link} lang={lang} key={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
