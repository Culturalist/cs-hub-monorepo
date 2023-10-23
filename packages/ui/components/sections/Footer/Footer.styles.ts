import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "xs:container mx-auto p-offset flex flex-col gap-32",
    navigation: "typo-caps-sm flex flex-col xs:flex-row items-stretch flex-wrap gap-x-20 gap-y-8 xs:gap-y-12",
    navLink: "",
    navLinkCaption: "trim-line hover:text-on-surface-light",
    wrapper: "flex flex-col items-start sm:flex-row gap-8 sm:gap-gutter text-on-surface-light",
    logoImage: "h-32 invert-footer-logo",
    contactsWrapper: "typo-short grow shrink self-stretch flex justify-between gap-gutter pt-4",
    contacts: "flex flex-col md:flex-row flex-wrap gap-y-4 gap-x-gutter",
    social: "flex flex-col md:flex-row justify-end items-end md:items-start gap-y-4 gap-x-gutter flex-nowrap",
    socialLink: "underline hover:no-underline hover:text-on-surface [&_span]:text-right"
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
