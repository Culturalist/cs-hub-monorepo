import { CoverBlock, CoverParent, ImageSources, LocaleString, VideoSources } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { createStyles } from "./Cover.styles";
import HeroImage from "./HeroImage";
import HeroVideo from "./HeroVideo";
import PageImage from "./PageImage";
import PageVideo from "./PageVideo";

interface CoverProps extends DefaultProps {
    array?: CoverBlock[];
    caption?: LocaleString;
    alt?: LocaleString;
    parent?: CoverParent;
}

export default function Cover(props: CoverProps) {
    const { array, caption, alt, parent = "page", lang, className } = props;
    const images: ImageSources = {};
    const video: VideoSources = {};
    const styles = createStyles({ className, parent });
    const commonProps = {
        lang,
        className: styles.container
    };

    array &&
        array.length > 0 &&
        [...array].reverse().forEach((cover) => {
            if (cover._type === "coverImage") {
                cover.asset && cover.useMedia.length > 0 && cover.useMedia.forEach((use) => (images[use] = cover));
            } else {
                cover.url && cover.useMedia.length > 0 && cover.useMedia.forEach((use) => (video[use] = cover));
            }
        });

    if (Object.keys(video).length > 0) {
        if (parent === "hero") {
            return <HeroVideo sources={video} posters={images} {...commonProps} />;
        }
        return <PageVideo sources={video} posters={images} caption={caption} {...commonProps} />;
    } else if (Object.keys(images).length > 0) {
        if (parent === "hero") {
            return <HeroImage sources={images} alt={alt || caption} {...commonProps} />;
        }
        return <PageImage sources={images} caption={caption} alt={alt || caption} {...commonProps} />;
    }

    return null;
}
