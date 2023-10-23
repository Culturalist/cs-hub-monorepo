import React from "react";
import { PortableText as PortableTextRender, PortableTextComponents } from "@portabletext/react";
import { globalConfig, Breakpoint, DefaultProps } from "@cs/globals";
import { mapKeys, neatChildrenBreaks } from "@cs/globals/utils";
import { getImageUrl } from "@cs/globals/lib/sanity";
import { BlockParent, LocalePortableText, MediaImage } from "@cs/data/schemas";
import { localizeString } from "@cs/data/utils";
import { AdaptiveDimentions, boxPx, breakpoints } from "../../../utils";
import metrics from "../../../metrics";
import LinkWrapper from "../LinkWrapper";
import Image from "../Image";
import { createStyles } from "./PortableText.styles";

interface PortableTextBlockProps extends DefaultProps {
    data?: LocalePortableText;
    parent: BlockParent;
}

export default function PortableText(props: PortableTextBlockProps) {
    const { lang, parent, className } = props;
    const styles = createStyles({ parent, className });
    const data =
        props.data?.[lang] ||
        (globalConfig.localization.safeReplace ? props.data?.[globalConfig.localization.default] : undefined);

    const imageSizes: Record<"body" | "column", AdaptiveDimentions> = {
        body: {
            xs: [metrics.breakpoints.xs - 2 * metrics.grid.offset, 0],
            sm: [metrics.breakpoints.sm - 2 * metrics.grid.offset, 0],
            md: [metrics.breakpoints.md - 2 * metrics.grid.offset, 0],
            lg: [metrics.breakpoints.lg - 2 * metrics.grid.offset, 0]
        },
        column: {
            xs: [metrics.breakpoints.xs - 2 * metrics.grid.offset, 0],
            sm: [metrics.breakpoints.sm - 2 * metrics.grid.offset, 0],
            md: [Math.floor((metrics.breakpoints.md - 2 * metrics.grid.offset - metrics.grid.md.gutter) / 2), 0],
            lg: [Math.floor((metrics.breakpoints.lg - 2 * metrics.grid.offset - metrics.grid.lg.gutter) / 2), 0]
        }
    };

    const components: PortableTextComponents = {
        marks: {
            strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
            underline: ({ children }) => <span className={styles.underline}>{children}</span>,
            "strike-through": ({ children }) => <span className={styles.strikethrough}>{children}</span>,
            // em: ({ children }) => <em>{children}</em>,
            link: ({ value, children }) => (
                <LinkWrapper link={value} lang={lang} className={styles.link}>
                    {children}
                </LinkWrapper>
            )
        },
        list: {
            bullet: ({ children }) => <ul className={styles.ul}>{neatChildrenBreaks(children, 2)}</ul>,
            number: ({ children }) => <ol className={styles.ol}>{neatChildrenBreaks(children, 2)}</ol>
        },
        block: {
            normal: ({ children }) => (
                <p className={styles.normalWrapper}>
                    <span className={styles.normal}>{neatChildrenBreaks(children, 2)}</span>
                </p>
            ),
            lead: ({ children }) => (
                <p className={styles.leadWrapper}>
                    <span className={styles.lead}>{neatChildrenBreaks(children, 2)}</span>
                </p>
            ),
            small: ({ children }) => (
                <p className={styles.smallWrapper}>
                    <span className={styles.small}>{neatChildrenBreaks(children, 2)}</span>
                </p>
            ),
            h3: ({ children }) => (
                <h3 className={styles.h3Wrapper}>
                    <span className={styles.h3}>{neatChildrenBreaks(children, 2)}</span>
                </h3>
            ),
            h4: ({ children }) => (
                <h4 className={styles.h4Wrapper}>
                    <span className={styles.h4}>{neatChildrenBreaks(children, 2)}</span>
                </h4>
            )
        },
        types: {
            mediaImage: ({ value }: { value: MediaImage }) => {
                if (parent !== "field") {
                    const caption = localizeString(value.caption, lang);
                    const alt = localizeString(value.alt, lang);
                    const coverUrls = mapKeys<Breakpoint, string>(breakpoints, (br: Breakpoint) =>
                        getImageUrl(value, ...boxPx(imageSizes[parent], br))
                    );
                    return (
                        <figure className={styles.imageWrapper}>
                            <Image
                                sources={coverUrls}
                                sizes={imageSizes[parent]}
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
                return null;
            }
        }
    };
    if (!data) {
        return <div></div>;
    }
    return (
        <div className={styles.container}>
            <PortableTextRender value={data} components={components} />
        </div>
    );
}
