import { localizeString } from "@cs/data/utils";
import { BlockSchedule } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { createStyles } from "./BlockSchedule.styles";
import { PortableText } from "../../PortableText";

interface BlockScheduleProps extends DefaultProps {
    data: BlockSchedule;
}

export default function BlockSchedule(props: BlockScheduleProps) {
    const { data, lang, className } = props;
    const { schedule } = data;
    if (!schedule || schedule.length === 0) return null;

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {schedule.map((element, i) => {
                const { time, description, _key } = element;
                const title = localizeString(element.title, lang);
                const subtitle = localizeString(element.subtitle, lang);
                return (
                    <div className={styles.element} key={i}>
                        <div className={styles.timeCol}>
                            {time && (
                                <p className={styles.timeWrapper}>
                                    <span className={styles.time}>{time}</span>
                                </p>
                            )}
                        </div>
                        <div className={styles.contentCol}>
                            {title && (
                                <h3 className={styles.titleWrapper}>
                                    <span className={styles.title}>{title}</span>
                                </h3>
                            )}
                            {subtitle && (
                                <p className={styles.subtitleWrapper}>
                                    <span className={styles.subtitle}>{subtitle}</span>
                                </p>
                            )}
                            <PortableText
                                data={description}
                                parent="field"
                                lang={lang}
                                className={styles.description}
                            />
                            {/* {description && (
                                <>
                                    <div id={`collapse-${_key}`} className={styles.descriptionWrapper}>
                                    </div>
                                    {!expandDescription && (
                                        <Collapsible
                                            target={`collapse-${_key}`}
                                            lang={lang}
                                            title={dictionary.readMore}
                                            initial={false}
                                            className={styles.readMore}
                                        />
                                    )}
                                </>
                            )} */}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
