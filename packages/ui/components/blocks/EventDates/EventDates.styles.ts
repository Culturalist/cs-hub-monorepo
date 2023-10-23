import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "flex flex-col gap-x-gutter gap-y-gutter sm:max-md:gap-y-module",
    event: "flex flex-row gap-gutter items-stretch",
    dateWrapper: "basis-m4 sm:basis-m6 lg:basis-m4 shrink-0",
    date: "typo-caps-2xl trim-line",
    details: "typo-short flex flex-col justify-start mt-8 sm:mt-20",
    time: "trim-line",
    locationLink: "underline hover:no-underline hover:text-primary",
    locationWrapper: "",
    location: "trim-line"
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
