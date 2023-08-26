'use client';
import { DefaultProps } from 'globals';
import { createStyles } from './HeroVideo.styles';
import { ImageSources, UseMedia, VideoSources } from 'data/schemas';
import { useEffect, useRef, useState } from 'react';
import { getImageUrl } from 'globals/lib/sanity';
import globalConfig from 'globals/globalConfig';

interface HeroVideoProps extends DefaultProps {
    sources: VideoSources;
    posters?: ImageSources;
}

export default function HeroVideo(props: HeroVideoProps) {
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
    const videoRef = useRef<HTMLVideoElement>(null);
    const device = useRef<UseMedia>('desktop');
    const [source, setSource] = useState(sources[device.current]);
    const [trim, setTrim] = useState<'x' | 'y'>('x');
    const videoId = sources[device.current]?.asset?._id;

    const styles = createStyles({ className });

    function changeSource(use: UseMedia) {
        device.current = use;
        setSource(sources[device.current]);
    }

    function validateSize() {
        if (responsive) {
            if (window.innerWidth > window.innerHeight && device.current == 'mobile') {
                changeSource('desktop');
            } else if (window.innerWidth <= window.innerHeight && device.current == 'desktop') {
                changeSource('mobile');
            }
        }

        if (videoRef.current) {
            if (videoRef.current?.videoHeight) {
                setTrim(
                    videoRef.current.videoWidth / videoRef.current.videoHeight > window.innerWidth / window.innerHeight
                        ? 'x'
                        : 'y'
                );
            } else {
                setTimeout(validateSize, 500);
            }
        }
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [source]);

    useEffect(() => {
        validateSize();
        window.addEventListener('resize', validateSize);
        return () => window.removeEventListener('resize', validateSize);
    }, [videoRef]);

    if (!source) return null;

    return (
        <div data-trim={trim} className={styles.container}>
            <video
                id={videoId}
                ref={videoRef}
                // poster={
                //     posters[device.current] &&
                //     getImageUrl(
                //         posters[device.current]!,
                //         device.current == 'mobile' ? globalConfig.breakpoints.sm : globalConfig.breakpoints.lg
                //     )
                // }
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
