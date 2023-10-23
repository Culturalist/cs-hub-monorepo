"use client";
import { useEffect } from "react";

interface TypoInitProps {}

export default function TypoInit(props: TypoInitProps) {
    useEffect(() => {
        //Determine font rendering method
        if (/Chrome|Safari/i.test(navigator.userAgent) && !/Android|Windows/i.test(navigator.userAgent)) {
            document.documentElement.setAttribute("data-useragent", "hhea");
        } else {
            document.documentElement.setAttribute("data-useragent", "typo");
        }
    }, []);

    return null;
}
