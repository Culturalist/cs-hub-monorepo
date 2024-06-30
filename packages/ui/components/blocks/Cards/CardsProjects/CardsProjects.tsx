import { localizeString, wrapReference } from "@cs/data/utils";
import { CoverBlock, Project } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { getImageUrl } from "@cs/globals/lib/sanity";
import { createStyles } from "./CardsProjects.styles";
import { LinkWrapper } from "../../LinkWrapper";
import { box, BoxDimentions } from "../../../../utils";
import { numeric } from "@weresk/core";
import { gridConfig } from "../../../../maket";

interface CardsProjectsProps extends DefaultProps {
    data: Project[];
    showLabels?: boolean;
}

export default function CardsProjects(props: CardsProjectsProps) {
    const { data, lang, className } = props;
    const styles = createStyles({ className });

    const coverSize = box([12, 8], "lg").map((s) => s * numeric(gridConfig.pd?.lg)) as BoxDimentions;

    return (
        <div className={styles.container}>
            {data.map((card, i) => {
                const { covers, labels } = card;
                const showLabels = props.showLabels && labels && labels.length > 0;
                const title = localizeString(card.title, lang);
                let cover: CoverBlock | undefined;

                covers &&
                    covers.length > 0 &&
                    covers.every((nextCover) => {
                        if (nextCover._type === "coverImage") {
                            cover = nextCover;
                        }
                        return !nextCover.useMedia.includes("desktop");
                    });

                const coverUrl = cover && getImageUrl(cover, ...coverSize);

                return (
                    <LinkWrapper link={wrapReference(card)} lang={lang} className={styles.card} key={i}>
                        <div className={styles.wrapper}>
                            {/* LABELS */}
                            {showLabels ? (
                                <div className={styles.labels}>
                                    {labels.map((label, j) => (
                                        <div className={styles.labelWrapper} key={j}>
                                            <span className={styles.label}>{localizeString(label.title, lang)}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div></div>
                            )}
                            {/* TITLE */}
                            {title && (
                                <h4 className={styles.titleWrapper}>
                                    <span className={styles.title}>{title}</span>
                                </h4>
                            )}
                        </div>
                        {/* COVER */}
                        {coverUrl ? (
                            <img src={coverUrl} alt={title} className={styles.cover} />
                        ) : (
                            <div className={styles.box}></div>
                        )}
                    </LinkWrapper>
                );
            })}
        </div>
    );
}
