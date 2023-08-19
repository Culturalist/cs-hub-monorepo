'use client';
import { PageDocument } from 'data/schemas';
import { wrapReference } from 'data/utils';
import { DefaultProps } from 'globals';
import { localizeString } from 'weresk/utils';
import { createStyles } from './Menu.styles';
import LinkWrapper from '../LinkWrapper';
import { useState } from 'react';
import Languages from '../Languages';

interface MenuProps extends DefaultProps {
    links: PageDocument[];
    languages?: string[];
}

export default function Menu(props: MenuProps) {
    const { links, languages, lang, className } = props;
    const [open, setOpen] = useState(false);
    const styles = createStyles({ className, open });

    function handleClick() {
        setOpen(prev => !prev);
    }

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
            <div className={styles.wrapper}>
                {/* NAVIGATION */}
                <nav className={styles.navigation}>
                    {links.map((link, i) => {
                        if (link._type !== 'reference') {
                            return (
                                <LinkWrapper link={wrapReference(link)} lang={lang} className={styles.link} key={i}>
                                    <span className={styles.linkCaption}>{localizeString(link.title, lang)}</span>
                                </LinkWrapper>
                            );
                        }
                        return null;
                    })}
                </nav>
                {/* LANGUAGES */}
                <Languages active={languages} lang={lang} className={styles.languages} />
            </div>
        </>
    );
}