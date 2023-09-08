import { localizeString } from 'data/utils';
import { BlockMedia, MediaLayout } from 'data/schemas';
import { Breakpoint, DefaultProps } from 'globals';
import { getImageUrl } from 'globals/lib/sanity';
import { mapKeys } from 'globals/utils';
import metrics from '../../../../metrics';
import { AdaptiveDimentions, BoxDimentions, boxPx, breakpoints } from '../../../../utils';
import Image from '../../Image';
import { createStyles } from './BlockMedia.styles';

interface BlockMediaProps extends DefaultProps {
    data: BlockMedia;
}

export default function BlockMedia(props: BlockMediaProps) {
    const { data, lang, className } = props;
    const { layout, media } = data;
    if (!media || media.length == 0) return null;

    const styles = createStyles({ className, layout });

    const sizes: Record<MediaLayout, AdaptiveDimentions> = {
        full: {
            xs: [metrics.breakpoints.xs - 2 * metrics.grid.offset, 0],
            sm: [metrics.breakpoints.sm - 2 * metrics.grid.offset, 0],
            md: [metrics.breakpoints.md - 2 * metrics.grid.offset, 0],
            lg: [metrics.breakpoints.lg - 2 * metrics.grid.offset, 0]
        },
        '2-columns': {
            xs: [metrics.breakpoints.xs - 2 * metrics.grid.offset, 0],
            sm: [Math.floor((metrics.breakpoints.sm - 2 * metrics.grid.offset - metrics.grid.sm.gutter) / 2), 0],
            md: [Math.floor((metrics.breakpoints.md - 2 * metrics.grid.offset - metrics.grid.md.gutter) / 2), 0],
            lg: [Math.floor((metrics.breakpoints.lg - 2 * metrics.grid.offset - metrics.grid.lg.gutter) / 2), 0]
        },
        '3-columns': {
            xs: [metrics.breakpoints.xs - 2 * metrics.grid.offset, 0],
            sm: [Math.floor((metrics.breakpoints.sm - 2 * metrics.grid.offset - metrics.grid.sm.gutter) / 2), 0],
            md: [Math.floor((metrics.breakpoints.md - 2 * metrics.grid.offset - 2 * metrics.grid.md.gutter) / 3), 0],
            lg: [Math.floor((metrics.breakpoints.lg - 2 * metrics.grid.offset - 2 * metrics.grid.lg.gutter) / 3), 0]
        }
    };

    return (
        <div className={styles.container}>
            {media.map((item, i) => {
                if (item._type == 'mediaImage') {
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
                } else if (item._type == 'mediaVideo' && item.url) {
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
