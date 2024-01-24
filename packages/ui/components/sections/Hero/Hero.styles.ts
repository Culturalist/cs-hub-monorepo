import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {
    leadLength: number;
}

type LeadSize = "short" | "medium" | "long";

const defaultStyles = {
    container: "hero",
    wrapper: "min-h-hero-height pb-offset flex flex-col gap-module justify-between",
    leadWrapper: "",
    lead: "trim-line text-outline hyphens-auto sm:hyphens-none text-on-surface",
    short: "typo-caps-huge",
    medium: "typo-caps-3xl",
    long: "typo-caps-2xl",
    cards: "",
    links: "mb-gutter",
    bg: "absolute -z-50 inset-0 w-full h-[100svh] bg-surface",
    cover: "w-full h-full"
};

export const createStyles = ({ className, leadLength }: StyleProps) => {
    let leadSize: LeadSize = "long";
    if (leadLength < 30) {
        leadSize = "short";
    } else if (leadLength < 120) {
        leadSize = "medium";
    }
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className),
        lead: cx(defaultStyles.lead, defaultStyles[leadSize])
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
