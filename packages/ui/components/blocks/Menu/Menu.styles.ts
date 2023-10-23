import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {
    open: boolean;
}

const defaultStyles = {
    button: "relative basis-bar-height h-bar-height shrink-0 grow-0",
    icon: "absolute z-50 top-0 left-0 w-bar-height h-bar-height",
    close: "text-on-surface",
    menu: "text-on-surface",
    container:
        "absolute z-40 top-0 left-0 w-full h-[100dvh] flex flex-col items-center gap-offset text-on-surface bg-surface overflow-y-scroll transitiion-opacity duration-300",
    wrapper: "w-full h-full pt-16 pb-32 flex flex-col items-center justify-between gap-offset",
    markerWrapper: "visible sm:invisible",
    marker: "typo-caps-lg trim-line !font-light text-center whitespace-nowrap",
    navigation: "flex flex-col items-center gap-12 sm:gap-20 pb-header-height",
    link: "",
    linkCaption: "typo-caps-3xl trim-line hover:text-outline lg:hover:text-outline-thick",
    languages: "",
    state: {
        open: "",
        closed: "lock-scroll opacity-0 pointer-events-none"
    }
};

export const createStyles = ({ open, className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        button: cx(defaultStyles.button, className),
        menuIcon: cx(defaultStyles.state[!open ? "open" : "closed"], defaultStyles.icon, defaultStyles.menu),
        closeIcon: cx(defaultStyles.state[open ? "open" : "closed"], defaultStyles.icon, defaultStyles.close),
        container: cx(defaultStyles.state[open ? "open" : "closed"], defaultStyles.container)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
