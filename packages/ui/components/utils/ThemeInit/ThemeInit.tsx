'use client';
import { useHotkeys } from 'react-hotkeys-hook';
import Grid from '../Grid';
import { useEffect, useState } from 'react';
// import { useSearchParams } from 'next/navigation';

interface ThemeInitProps {}

export default function ThemeInit(props: ThemeInitProps) {
    // const searchParams = useSearchParams();
    const [showGrid, setShowGrid] = useState(true);
    useHotkeys('shift+g', () => setShowGrid(prev => !prev));

    useEffect(() => {
        //Determine font rendering method
        if (/Chrome|Safari/i.test(navigator.userAgent) && !/Android|Windows/i.test(navigator.userAgent)) {
            document.documentElement.setAttribute('data-useragent', 'hhea');
        } else {
            document.documentElement.setAttribute('data-useragent', 'typo');
        }
    }, []);

    if (showGrid) {
        return <Grid />;
    }
    return null;
}