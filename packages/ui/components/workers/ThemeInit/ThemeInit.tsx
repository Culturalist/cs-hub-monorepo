'use client';
import { useHotkeys } from 'react-hotkeys-hook';
import Grid from '../Grid';
import { useEffect, useState } from 'react';
import { globalConfig } from 'globals';
// import { useSearchParams } from 'next/navigation';

interface ThemeInitProps {}

export default function ThemeInit(props: ThemeInitProps) {
    // const searchParams = useSearchParams();
    const [showGrid, setShowGrid] = useState(false);
    useHotkeys('shift+g', () => setShowGrid(prev => !prev));

    useEffect(() => {
        //Set app theme
        // setPageTheme(app);
        //Determine font rendering method
        if (/Chrome|Safari/i.test(navigator.userAgent) && !/Android|Windows/i.test(navigator.userAgent)) {
            document.documentElement.setAttribute('data-useragent', 'hhea');
        } else {
            document.documentElement.setAttribute('data-useragent', 'typo');
        }
    }, []);

    if (showGrid && globalConfig.debug) {
        return <Grid />;
    }
    return null;
}
