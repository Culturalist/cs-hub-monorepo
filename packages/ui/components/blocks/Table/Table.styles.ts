import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "w-full typo-short-lg",
    topHeader: "border-b border-on-surface",
    leftHeader: "",
    body: "",
    row: "",
    cellWrapper: "px-8 py-12",
    cell: "align-top"
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
