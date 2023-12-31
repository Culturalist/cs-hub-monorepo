import { LineupOrganisations, LineupPeople } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { localizeString } from "@cs/data/utils";
import { createStyles } from "./Lineup.styles";

interface LineupProps extends DefaultProps {
    data?: (LineupPeople | LineupOrganisations)[];
}

export default function Lineup(props: LineupProps) {
    const { data, lang, className } = props;
    if (!data || data.length === 0) return null;

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {data.map((group, i) => {
                const { list, includeSubtitle } = group;
                const label = localizeString(group.label?.title, lang);
                if (!list || list.length === 0) return null;
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
                                const subtitle = localizeString(
                                    person.subtitle,
                                    lang
                                );
                                if (!name) return null;
                                return (
                                    <div className={styles.person} key={j}>
                                        <p
                                            title={
                                                !includeSubtitle
                                                    ? subtitle
                                                    : undefined
                                            }
                                            className={styles.nameWrapper}
                                        >
                                            <span className={styles.name}>
                                                {name}
                                            </span>
                                        </p>
                                        {includeSubtitle && (
                                            <p
                                                className={
                                                    styles.subtitleWrapper
                                                }
                                            >
                                                <span
                                                    className={styles.subtitle}
                                                >
                                                    {subtitle}
                                                </span>
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
