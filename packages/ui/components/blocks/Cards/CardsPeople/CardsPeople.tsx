import { localizeString, wrapReference } from 'data/utils';
import { CardPart, Person } from 'data/schemas';
import { DefaultProps } from 'globals';
import globalConfig from 'globals/globalConfig';
import { getImageUrl } from 'globals/lib/sanity';
import LinkContact from '../../LinkContact';
import PortableText from '../../PortableText';
import { createStyles } from './CardsPeople.styles';
import LinkWrapper from '../../LinkWrapper';

interface CardsPeopleProps extends DefaultProps {
    data: Person[];
    include?: CardPart[];
    monochrome?: boolean;
}

export default function CardsPeople(props: CardsPeopleProps) {
    const { data, include, monochrome, lang, className } = props;
    const styles = createStyles({ className, monochrome });

    return (
        <div className={styles.container}>
            {data.map((card, i) => {
                const { photo, contacts, description } = card;
                const name = localizeString(card.title, lang);
                const position = localizeString(card.position, lang);
                const photoUrl =
                    photo &&
                    getImageUrl(photo, ...new Array(2).fill(globalConfig.breakpoints.xs * globalConfig.pd.xs * 2));
                return (
                    <div className={styles.card} key={i}>
                        <LinkWrapper
                            link={include?.includes('link') ? wrapReference(card) : undefined}
                            lang={lang}
                            className={styles.linkWrapper}
                        >
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
                        {include?.includes('subtitle') && position && (
                            <p className={styles.positionWrapper}>
                                <span className={styles.position}>{position}</span>
                            </p>
                        )}
                        {/* DESCRIPTION */}
                        {include?.includes('description') && (
                            <PortableText
                                data={description}
                                parent="field"
                                lang={lang}
                                className={styles.description}
                            />
                        )}
                        {/* CONTACTS */}
                        {include?.includes('contacts') && contacts && contacts.length > 0 && (
                            <div className={styles.contacts}>
                                {contacts.map((link, i) => (
                                    <LinkContact link={link} lang={lang} key={i} />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
