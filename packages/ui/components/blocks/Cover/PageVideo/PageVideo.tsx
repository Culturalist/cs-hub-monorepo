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
    const responsive = !!props.sources.desktop && !!props.sources.mobile;
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [device, setDevice] = useState<UseMedia>('desktop');
    const [trim, setTrim] = useState<'x' | 'y'>('y');
    const videoId = sources[device]?.asset?._id;

    const styles = createStyles({ className });

    function validateSize() {
        console.log(containerRef.current?.clientWidth, containerRef.current?.clientHeight);
        if (videoRef.current && containerRef.current) {
            setDevice(containerRef.current.clientWidth > containerRef.current.clientHeight ? 'desktop' : 'mobile');
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

        if (responsive) {
            window.addEventListener('resize', validateSize);
            return () => window.removeEventListener('resize', validateSize);
        }
    }, [videoRef, containerRef]);

    if (!sources[device]) return null;

    return (
        <div ref={containerRef} data-trim={trim} className={styles.container}>
            <video
                id={videoId}
                ref={videoRef}
                poster={
                    posters[device] &&
                    getImageUrl(
                        posters[device]!,
                        device == 'mobile' ? globalConfig.breakpoints.sm : globalConfig.breakpoints.lg
                    )
                }
                className={styles.video}
                playsInline={true}
                autoPlay={true}
                muted={true}
                loop={true}
                controls={false}
            >
                <source src={sources[device]?.url} type="video/mp4" />
            </video>
        </div>
    );
}
