import { localizeString } from "@cs/data/utils";
import { BlockMedia, MediaLayout } from "@cs/data/schemas";
import { Breakpoint, DefaultProps } from "@cs/globals";
import { getImageUrl } from "@cs/globals/lib/sanity";
import { mapKeys } from "@cs/globals/utils";
import { gridConfig } from "../../../../maket";
import { AdaptiveDimentions, box, boxPx, breakpoints } from "../../../../utils";
import Image from "../../Image";
import { createStyles } from "./BlockMedia.styles";
import { numeric } from "@weresk/core";

interface BlockMediaProps extends DefaultProps {
    data: BlockMedia;
}

export default function BlockMedia(props: BlockMediaProps) {
    const { data, lang, className } = props;
    const { layout, media } = data;
    if (!media || media.length === 0) return null;

    const styles = createStyles({ className, layout });

    const sizes: Record<MediaLayout, AdaptiveDimentions> = {
        full: {
            xs: box([12, 0], "xs"),
            sm: box([24, 0], "sm"),
            md: box([20, 0], "md"),
            lg: box([20, 0], "lg")
        },
        "2-columns": {
            xs: box([12, 0], "xs"),
            sm: box([12, 0], "sm"),
            md: box([12, 0], "md"),
            lg: box([12, 0], "lg")
        },
        "3-columns": {
            xs: box([12, 0], "xs"),
            sm: box([12, 0], "sm"),
            md: box([8, 0], "md"),
            lg: box([8, 0], "lg")
        }
    };

    return (
        <div className={styles.container}>
            {media.map((item, i) => {
                if (item._type === "mediaImage") {
                    const caption = localizeString(item.caption, lang);
                    const alt = localizeString(item.alt, lang);
                    const coverUrls = mapKeys<Breakpoint, string>(breakpoints, (br: Breakpoint) =>
                        getImageUrl(item, ...boxPx(sizes[layout], br))
                    );
                    return (
                        <figure className={styles.wrapper} key={i}>
                            <Image
                                sources={coverUrls}
                                sizes={sizes[layout]}
                                alt={alt}
                                lang={lang}
                                className={styles.image}
                            />
                            {caption && (
                                <figcaption className={styles.captionWrapper}>
                                    <span className={styles.caption}>{caption}</span>
                                </figcaption>
                            )}
                        </figure>
                    );
                }
                // eslint-disable-next-line
                else if (item._type === "mediaVideo" && item.url) {
                    const caption = localizeString(item.caption, lang);
                    return (
                        <figure className={styles.wrapper} key={i}>
                            <video
                                className={styles.video}
                                autoPlay={item.autoplay}
                                playsInline={item.autoplay}
                                muted={item.autoplay}
                                loop={item.autoplay}
                                controls={true}
                            >
                                <source src={item.url} type="video/mp4" />
                            </video>
                            {caption && (
                                <figcaption className={styles.captionWrapper}>
                                    <span className={styles.caption}>{caption}</span>
                                </figcaption>
                            )}
                        </figure>
                    );
                }
                return null;
            })}
        </div>
    );
}
