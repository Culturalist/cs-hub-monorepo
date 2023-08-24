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
    const { lang, className } = props;
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
    const [source, setSource] = useState(sources[device]);
    const [poster, setPoster] = useState(posters[device]);
    const videoId = source && `video-${source.asset?._id}`;

    const styles = createStyles({ className });

    function validateSize() {
        setDevice(window.innerWidth > window.innerHeight ? 'desktop' : 'mobile');
        if (videoRef.current) {
            setTrim(
                videoRef.current.videoWidth / videoRef.current.videoHeight > window.innerWidth / window.innerHeight
                    ? 'x'
                    : 'y'
            );
        }
    }

    useEffect(() => {
        setSource(sources[device]);
        setPoster(posters[device]);
    }, [device]);

    useEffect(() => {
        validateSize();

        if (responsive) {
            window.addEventListener('resize', validateSize);
            return () => window.removeEventListener('resize', validateSize);
        }
    }, []);

    if (!source) return null;

    return (
        <div data-trim={trim} className={styles.container}>
            <video
                id={videoId}
                ref={videoRef}
                poster={
                    poster &&
                    getImageUrl(poster, device == 'mobile' ? globalConfig.breakpoints.sm : globalConfig.breakpoints.lg)
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
