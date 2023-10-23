import { Breakpoint, DefaultProps } from "@cs/globals";
import { createStyles } from "./HeroImage.styles";
import { ImageSources, LocaleString } from "@cs/data/schemas";
import {
    AdaptiveDimentions,
    BoxDimentions,
    boxFromWidthRatio,
    boxPx,
    breakpoints
} from "../../../../utils";
import { getImageUrl } from "@cs/globals/lib/sanity";
import Image from "../../Image";
import { mapKeys } from "@cs/globals/utils";
import metrics from "../../../../metrics";

interface HeroImageProps extends DefaultProps {
    sources: ImageSources;
    alt?: LocaleString;
}

export default function HeroImage(props: HeroImageProps) {
    const { sources, alt, lang, className } = props;
    if (Object.keys(sources).length === 0) return null;

    const styles = createStyles({ className });
    const desktop = sources.desktop || sources.mobile;
    const mobile = sources.mobile || sources.desktop;

    const container = {
        xs: 2 / 3,
        sm: 1,
        md: 3 / 2,
        lg: 16 / 9
    };

    const sizes: AdaptiveDimentions = mapKeys<Breakpoint, BoxDimentions>(
        breakpoints,
        (br: Breakpoint) =>
            boxFromWidthRatio(metrics.breakpoints[br], container[br])
    );

    const coverUrls = desktop &&
        mobile && {
            xs: getImageUrl(mobile, ...boxPx(sizes, "xs")),
            sm: getImageUrl(desktop, ...boxPx(sizes, "sm")),
            md: getImageUrl(desktop, ...boxPx(sizes, "md")),
            lg: getImageUrl(desktop, ...boxPx(sizes, "lg"))
        };

    return (
        <div className={styles.container}>
            <Image
                sources={coverUrls}
                sizes={sizes}
                alt={alt}
                lang={lang}
                className={styles.image}
            />
        </div>
    );
}
