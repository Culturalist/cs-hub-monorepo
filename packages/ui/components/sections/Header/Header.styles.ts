import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "hero xs:container mx-auto h-header-height p-offset flex flex-row gap-16 items-center",
    wrapper: "w-full flex flex-row gap-16 items-center text-on-surface",
    logo: "",
    logoImage: "h-logo-height invert-header-logo",
    defaultLogo: "flex flex-row items-center gap-8 sm:gap-gutter",
    title: "typo-caps-sm sm:typo-caps-lg trim-cap",
    line: "hidden sm:block flex-grow flex-shrink-0 basis-8 border-[0.5px] sm:border border-ontext-on-surface",
    markerWrapper: "hidden sm:block",
    marker: "typo-caps-sm sm:typo-caps-lg trim-cap !font-light text-right whitespace-nowrap",
    menu: "text-on-surface"
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
