"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { LinkCaptioned, LinkExternal, PageDocument } from "@cs/data/schemas";
import { wrapReference, localizeString } from "@cs/data/utils";
import { DefaultProps } from "@cs/globals";
import { LinkWrapper } from "../LinkWrapper";
import { Languages } from "../Languages";
import { createStyles } from "./Menu.styles";

interface MenuProps extends DefaultProps {
    links?: (PageDocument | LinkExternal)[];
    marker?: LinkCaptioned;
    languages?: string[];
}

export default function Menu(props: MenuProps) {
    const pathname = usePathname();
    const { links, marker, languages, lang, className } = props;
    const markerCaption = marker && localizeString(marker.caption, lang);
    const [open, setOpen] = useState(false);
    const styles = createStyles({ className, open });

    function handleClick() {
        const body = document.querySelector("body");
        if (body) {
            !open ? body.classList.add("lock-scroll") : body.classList.remove("lock-scroll");
        }
        setOpen((prev) => !prev);
    }

    useEffect(() => {
        const body = document.querySelector("body");
        body && body.classList.remove("lock-scroll");
        setOpen(false);
    }, [pathname]);

    return (
        <>
            <button onClick={handleClick} className={styles.button}>
                {/* <Bars3Icon id="menu-icon" className={styles.menuIcon} /> */}
                <svg
                    id="menu-icon"
                    className={styles.menuIcon}
                    width={32}
                    height={32}
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect width="32" height="2.5" rx="0.5" />
                    <rect y="14.75" width="32" height="2.5" rx="0.5" />
                    <rect y="29.5" width="32" height="2.5" rx="0.5" />
                </svg>
                {/* <XMarkIcon id="close-icon" className={styles.closeIcon} /> */}
                <svg
                    id="close-icon"
                    className={styles.closeIcon}
                    width={32}
                    height={32}
                    viewBox="0 0 32 33"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="2" y="28" width="36" height="2.5" rx="0.5" transform="rotate(-45 2 28)" />
                    <rect x="4" y="3" width="36" height="2.5" rx="0.5" transform="rotate(45 4 3)" />
                </svg>
            </button>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    {/* MARKER */}
                    {marker && (
                        <LinkWrapper link={marker.link} lang={lang} className={styles.markerWrapper}>
                            <span className={styles.marker}>{markerCaption}</span>
                        </LinkWrapper>
                    )}
                    {/* NAVIGATION */}
                    <nav className={styles.navigation}>
                        {links &&
                            links.length > 0 &&
                            links.map((link, i) => {
                                return link._type === "linkExternal" ? (
                                    <LinkWrapper href={link.href} lang={lang} className={styles.link} key={i}>
                                        <span className={styles.linkCaption}>{localizeString(link.caption, lang)}</span>
                                    </LinkWrapper>
                                ) : (
                                    <LinkWrapper link={wrapReference(link)} lang={lang} className={styles.link} key={i}>
                                        <span className={styles.linkCaption}>{localizeString(link.title, lang)}</span>
                                    </LinkWrapper>
                                );
                            })}
                    </nav>
                    {/* LANGUAGES */}
                    <Languages active={languages} lang={lang} className={styles.languages} />
                </div>
            </div>
        </>
    );
}
