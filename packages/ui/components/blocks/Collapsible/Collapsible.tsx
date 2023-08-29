'use client';
import { LocaleString } from 'data/schemas';
import { createStyles } from './Collapsible.styles';
import { PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCallback, useEffect, useRef, useState } from 'react';
import { localizeString } from 'data/utils';
import gsap from 'gsap';
import { DefaultProps } from 'globals';

interface CollapsibleProps extends DefaultProps {
    target?: string;
    title?: LocaleString;
    initial?: boolean;
}

export default function Collapsible(props: CollapsibleProps) {
    const { target, lang, initial, className } = props;
    const title = localizeString(props.title, lang);
    const [open, setOpen] = useState(initial || false);
    const [init, setInit] = useState(false);
    const minHeight = 80;
    let height = useRef<number | string>(0);
    const styles = createStyles({ className });

    function toggleState() {
        setOpen(prev => !prev);
    }

    const animateOpen = useCallback(
        (toggleState: boolean) => {
            gsap.to(`#${target}`, {
                // opacity: toggleState ? 1 : 0,
                height: toggleState ? height.current : minHeight,
                // translateY: toggleState ? 0 : -20,
                duration: 0.75,
                ease: 'sine.inOut'
            });
        },
        [target]
    );

    const initCollapsible = useCallback(() => {
        height.current = gsap.getProperty(`#${target}`, 'height') || height.current;
        if (height.current !== 0) {
            gsap.to(`#${target}`, {
                overflow: 'hidden',
                // opacity: initial ? 1 : 0,
                height: initial ? height.current : minHeight
                // translateY: initial ? 0 : -20
            });
            setInit(true);
        }
    }, [initial]);

    useEffect(() => {
        if (init) {
            animateOpen(open);
        }
    }, [open, init]);

    useEffect(() => {
        initCollapsible();
    }, []);

    if (!init) return null;

    return (
        <button onClick={toggleState} className={styles.button}>
            {title && <span className={styles.title}>{title}</span>}
            <div className={styles.icon}>
                <PlusIcon className={styles.plus} />
                <MinusIcon className={styles.minus} />
            </div>
        </button>
    );
}
