import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: `typo-caps !font-light flex flex-row flex-nowrap justify-end gap-8 uppercase tracking-wider [&_li:not(:first-child)]:before:content-['/'] [&_li:not(:first-child)]:before:mr-8 [&_li:not(:first-child)]:before:text-on-surface-light/20`,
    link: "text-on-surface-light hover:text-on-surface",
    caption: ""
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
