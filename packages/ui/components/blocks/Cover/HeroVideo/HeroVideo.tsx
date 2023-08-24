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
    const responsive = !!props.sources.desktop && !!props.sources.mobile;
    const videoRef = useRef<HTMLVideoElement>(null);
    const [device, setDevice] = useState<UseMedia>('desktop');
    const [trim, setTrim] = useState<'x' | 'y'>('x');
    const videoId = sources[device]?.asset?._id;

    const styles = createStyles({ className });

    function validateSize() {
        setDevice(window.innerWidth > window.innerHeight ? 'desktop' : 'mobile');
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
        console.log(videoRef.current?.videoHeight);
    }

    useEffect(() => {
        validateSize();

        if (responsive) {
            window.addEventListener('resize', validateSize);
            return () => window.removeEventListener('resize', validateSize);
        }
    }, [videoRef]);

    if (!sources[device]) return null;

    return (
        <div data-trim={trim} className={styles.container}>
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
