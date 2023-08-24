'use client';
import { DefaultProps } from 'globals';
import { createStyles } from './CoverVideo.styles';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { UseMedia } from 'data';

export type VideoSources = Partial<Record<UseMedia, string>>;

interface CoverVideoProps extends DefaultProps {
    sources: VideoSources;
    posters?: SanityImageSource;
}

export default function CoverVideo(props: CoverVideoProps) {
    const { sources, posters, lang, className } = props;
    // if (!data) return null;

    const styles = createStyles({ className });

    return <div className={styles.container}>{/* <pre>{JSON.stringify(data, null, 4)}</pre> */}</div>;
}
