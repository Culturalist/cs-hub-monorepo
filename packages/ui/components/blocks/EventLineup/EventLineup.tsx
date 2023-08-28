import { ElementLineup } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString } from 'data/utils';
import { createStyles } from './EventLineup.styles';

interface EventLineupProps extends DefaultProps {
    data?: ElementLineup[];
}

export default function EventLineup(props: EventLineupProps) {
    const { data, lang, className } = props;
    if (!data || data.length == 0) return null;

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {data.map((group, i) => {
                const { list, includePosition } = group;
                const label = localizeString(group.label?.title, lang);
                if (!list || list.length == 0) return null;
                return (
                    <div className={styles.group} key={i}>
                        {label && (
                            <p className={styles.labelWrapper}>
                                <span className={styles.label}>{label}</span>
                            </p>
                        )}
                        <div className={styles.list}>
                            {list.map((person, j) => {
                                const name = localizeString(person.title, lang);
                                const subtitle = localizeString(person.position, lang);
                                if (!name) return null;
                                return (
                                    <div className={styles.person} key={j}>
                                        <p
                                            title={!includePosition ? subtitle : undefined}
                                            className={styles.nameWrapper}
                                        >
                                            <span className={styles.name}>{name}</span>
                                        </p>
                                        {includePosition && (
                                            <p className={styles.subtitleWrapper}>
                                                <span className={styles.subtitle}>{subtitle}</span>
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
