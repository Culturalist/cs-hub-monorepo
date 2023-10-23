import { LocaleString } from "@cs/data/schemas";
import { Breakpoint, DefaultProps } from "@cs/globals";
import { localizeString } from "@cs/data/utils";
import { AdaptiveDimentions } from "../../../utils";
import { createStyles } from "./Image.styles";
import metrics from "../../../metrics";

interface ImageProps extends DefaultProps {
    sources?: Record<Breakpoint, string>;
    sizes?: AdaptiveDimentions;
    alt?: LocaleString | string;
}

export default function Image(props: ImageProps) {
    const { sources, sizes, alt, lang, className } = props;
    if (!sources) return null;

    const styles = createStyles({ className });

    return (
        <picture className={styles.container}>
            <source
                srcSet={sources.xs}
                media={`(max-width: ${metrics.breakpoints.sm - 1}px)`}
                width={sizes?.xs[0] || undefined}
                height={sizes?.xs[1] || undefined}
            />
            <source
                srcSet={sources.sm}
                media={`(max-width: ${metrics.breakpoints.md - 1}px)`}
                width={sizes?.sm[0] || undefined}
                height={sizes?.sm[1] || undefined}
            />
            <source
                srcSet={sources.md}
                media={`(max-width: ${metrics.breakpoints.lg - 1}px)`}
                width={sizes?.md[0] || undefined}
                height={sizes?.md[1] || undefined}
            />
            <img
                role="img"
                src={sources.lg}
                width={sizes?.lg[0] || undefined}
                height={sizes?.lg[1] || undefined}
                alt={localizeString(alt, lang)}
                className={styles.image}
            />
        </picture>
    );
}
