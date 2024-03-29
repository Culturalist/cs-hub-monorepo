import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "",
    titleWrapper: "typo-caps mt-40",
    title: "trim-line",
    table: "w-full mt-32",
    topHeader: "border-b border-on-surface-light",
    leftHeader: "",
    body: "",
    row: "",
    cellWrapper: "py-8",
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
