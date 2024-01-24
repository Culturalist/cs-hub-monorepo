"use client";
import { DefaultProps } from "@cs/globals";
import { createStyles } from "./PageVideo.styles";
import { ImageSources, LocaleString, UseMedia, VideoSources } from "@cs/data/schemas";
import { useEffect, useRef, useState } from "react";
import { getImageUrl } from "@cs/globals/lib/sanity";
import { localizeString } from "@cs/data/utils";
import { gridConfig } from "../../../../maket";
import { numeric } from "@weresk/core";

interface PageVideoProps extends DefaultProps {
    sources: VideoSources;
    posters?: ImageSources;
    caption?: LocaleString;
}

export default function PageVideo(props: PageVideoProps) {
    const { className, lang } = props;
    const sources = {
        mobile: props.sources.mobile || props.sources.desktop,
        desktop: props.sources.desktop || props.sources.mobile
    };
    const posters = {
        mobile: props.posters?.mobile || props.posters?.desktop,
        desktop: props.posters?.desktop || props.posters?.mobile
    };
    const caption = localizeString(props.caption, lang);
    const responsive = sources.desktop?.url !== sources.mobile?.url;
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const device = useRef<UseMedia>("desktop");
    const mobileWidth = numeric(gridConfig.screens?.xs) * numeric(gridConfig.pd?.xs);
    const desktopWidth = numeric(gridConfig.screens?.lg) * numeric(gridConfig.pd?.lg);
    const [source, setSource] = useState(sources[device.current]);
    const [trim, setTrim] = useState<"x" | "y" | "load">("load");
    const videoId = sources[device.current]?.asset?._id;
    const styles = createStyles({ className });

    function changeSource(use: UseMedia) {
        const current = device.current;
        device.current = use;
        setSource(sources[device.current]);
        if (device.current !== current && videoRef.current) {
            videoRef.current.load();
        }
    }

    function validateSize() {
        if (videoRef.current && containerRef.current) {
            if (responsive) {
                if (
                    containerRef.current.clientWidth > containerRef.current.clientHeight &&
                    device.current === "mobile"
                ) {
                    changeSource("desktop");
                } else if (
                    containerRef.current.clientWidth <= containerRef.current.clientHeight &&
                    device.current === "desktop"
                ) {
                    changeSource("mobile");
                }
            }

            if (videoRef.current.videoHeight && containerRef.current.clientHeight) {
                setTrim(
                    videoRef.current.videoWidth / videoRef.current.videoHeight >
                        containerRef.current.clientWidth / containerRef.current.clientHeight
                        ? "x"
                        : "y"
                );
            } else {
                setTimeout(validateSize, 500);
            }
        }
    }

    useEffect(() => {
        validateSize();
        window.addEventListener("resize", validateSize);
        return () => {
            window.removeEventListener("resize", validateSize);
        };
    }, [videoRef, containerRef]);

    if (!source) return null;

    return (
        <figure className={styles.container}>
            <div ref={containerRef} data-trim={trim} className={styles.wrapper}>
                <video
                    id={videoId}
                    ref={videoRef}
                    poster={
                        posters[device.current] &&
                        getImageUrl(posters[device.current], device.current === "mobile" ? mobileWidth : desktopWidth)
                    }
                    className={styles.video}
                    playsInline={true}
                    autoPlay={true}
                    muted={true}
                    loop={true}
                    controls={false}
                >
                    <source src={source.url} type="video/mp4" />
                </video>
            </div>
            {caption && (
                <figcaption className={styles.captionWrapper}>
                    <span className={styles.caption}>{caption}</span>
                </figcaption>
            )}
        </figure>
    );
}
