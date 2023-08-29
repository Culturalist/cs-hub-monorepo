import { Person } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString } from 'data/utils';
import { Image, LinkContact, PortableText } from '../../blocks';
import { createStyles } from './PersonLayout.styles';
import { AdaptiveDimentions, box, boxPx } from '../../../utils';
import { getImageUrl } from 'globals/lib/sanity';
import globalConfig from 'globals/globalConfig';

interface PersonLayoutProps extends DefaultProps {
    data: Person;
}

export default function PersonLayout(props: PersonLayoutProps) {
    const { data, lang, className } = props;
    const { photo, contacts, description } = data;
    const name = localizeString(data.title, lang);
    const position = localizeString(data.position, lang);
    const photoUrl =
        photo && getImageUrl(photo, ...new Array(2).fill(globalConfig.breakpoints.xs * globalConfig.pd.xs * 2));
    const styles = createStyles({ className });

    return (
        <main className={styles.container}>
            {/* NAME */}
            <h1 className={styles.name}>
                <span>{name}</span>
            </h1>
            {position && (
                <p className={styles.positionWrapper}>
                    <span className={styles.position}>{position}</span>
                </p>
            )}
            <div className={styles.wrapper}>
                {/* PHOTO */}
                {photoUrl && <img src={photoUrl} alt={name} className={styles.photo} />}
                <div className={styles.info}>
                    {/* CONTACTS */}
                    {contacts && contacts.length > 0 && (
                        <div className={styles.contacts}>
                            {contacts.map((link, i) => (
                                <LinkContact link={link} lang={lang} key={i} />
                            ))}
                        </div>
                    )}
                    {/* DESCRIPTION */}
                    <PortableText data={description} parent="field" lang={lang} className={styles.description} />
                </div>
            </div>
        </main>
    );
}
