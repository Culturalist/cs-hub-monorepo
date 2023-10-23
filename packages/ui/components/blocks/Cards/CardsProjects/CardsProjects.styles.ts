import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "grid grid-cols-1 sm:grid-cols-2 gap-offset sm:gap-gutter",
    card: "relative text-on-primary bg-primary",
    box: "h-m8 xs:w-m12",
    wrapper: "absolute z-10 inset-0 h-full p-16 md:p-20 flex flex-col justify-between gap-8",
    labels: "flex flex-row flex-wrap gap-8",
    labelWrapper: "h-32 px-16 py-8 rounded-full border border-on-primary flex justify-center items-center",
    label: "typo-caps-2xs trim-cap",
    titleWrapper: "pr-module",
    title: "typo-title md:typo-title-lg trim-line break-words md:break-normal hyphens-auto sm:hyphens-none",
    cover: "w-full h-full object-cover"
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className),
        card: cx(defaultStyles.card, defaultStyles.box)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
