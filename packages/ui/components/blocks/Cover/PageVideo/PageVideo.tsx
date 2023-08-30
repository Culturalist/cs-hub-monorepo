'use client';
import { DefaultProps } from 'globals';
import { createStyles } from './PageVideo.styles';
import { ImageSources, UseMedia, VideoSources } from 'data/schemas';
import { useEffect, useRef, useState } from 'react';
import { getImageUrl } from 'globals/lib/sanity';
import globalConfig from 'globals/globalConfig';

interface PageVideoProps extends DefaultProps {
    sources: VideoSources;
    posters?: ImageSources;
}

export default function PageVideo(props: PageVideoProps) {
    const { className } = props;
    const sources = {
        mobile: props.sources?.mobile || props.sources?.desktop,
        desktop: props.sources?.desktop || props.sources?.mobile
    };
    const posters = {
        mobile: props.posters?.mobile || props.posters?.desktop,
        desktop: props.posters?.desktop || props.posters?.mobile
    };
    const responsive = sources.desktop?.url !== sources.mobile?.url;
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const device = useRef<UseMedia>('desktop');
    const [source, setSource] = useState(sources[device.current]);
    const [trim, setTrim] = useState<'x' | 'y' | 'load'>('load');
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
                    device.current == 'mobile'
                ) {
                    changeSource('desktop');
                } else if (
                    containerRef.current.clientWidth <= containerRef.current.clientHeight &&
                    device.current == 'desktop'
                ) {
                    changeSource('mobile');
                }
            }

            if (videoRef.current?.videoHeight && containerRef.current?.clientHeight) {
                setTrim(
                    videoRef.current.videoWidth / videoRef.current.videoHeight >
                        containerRef.current.clientWidth / containerRef.current.clientHeight
                        ? 'x'
                        : 'y'
                );
            } else {
                setTimeout(validateSize, 500);
            }
        }
    }

    useEffect(() => {
        validateSize();
        window.addEventListener('resize', validateSize);
        return () => window.removeEventListener('resize', validateSize);
    }, [videoRef, containerRef]);

    if (!source) return null;

    return (
        <div ref={containerRef} data-trim={trim} className={styles.container}>
            <video
                id={videoId}
                ref={videoRef}
                poster={
                    posters[device.current] &&
                    getImageUrl(
                        posters[device.current]!,
                        device.current == 'mobile'
                            ? globalConfig.breakpoints.sm * globalConfig.pd.xs
                            : globalConfig.breakpoints.lg * globalConfig.pd.lg
                    )
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
    );
}
