import { localizeString, wrapReference } from 'data/utils';
import { Person } from 'data/schemas';
import { DefaultProps } from 'globals';
import globalConfig from 'globals/globalConfig';
import { getImageUrl } from 'globals/lib/sanity';
import LinkContact from '../../LinkContact';
import PortableText from '../../PortableText';
import { createStyles } from './CardPerson.styles';
import LinkWrapper from '../../LinkWrapper';

interface CardPersonProps extends DefaultProps {
    data: Person;
}

export default function CardPerson(props: CardPersonProps) {
    const { data, lang, className } = props;
    const { photo, contacts, description } = data;
    const name = localizeString(data.title, lang);
    const position = localizeString(data.position, lang);
    const photoUrl =
        photo && getImageUrl(photo, ...new Array(2).fill(globalConfig.breakpoints.xs * globalConfig.pd.xs * 2));

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            <LinkWrapper link={wrapReference(data)} lang={lang} className={styles.linkWrapper}>
                {/* PHOTO */}
                {photoUrl ? (
                    <img src={photoUrl} alt={name} className={styles.photo} />
                ) : (
                    <div className={styles.box}></div>
                )}
                {/* NAME */}
                <p className={styles.nameWrapper}>
                    <span className={styles.name}>{name}</span>
                </p>
            </LinkWrapper>
            {/* POSITION */}
            {position && (
                <p className={styles.positionWrapper}>
                    <span className={styles.position}>{position}</span>
                </p>
            )}
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
    );
}
