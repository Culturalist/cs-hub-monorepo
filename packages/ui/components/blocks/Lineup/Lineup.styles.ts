import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-gutter gap-y-module",
    group: "pr-module",
    labelWrapper: "mb-12",
    label: "typo-title-sm trim-line text-on-surface-light",
    list: "flex flex-col gap-8",
    person: "",
    nameWrapper: "",
    name: "typo-caps-sm trim-line",
    subtitleWrapper: "mb-4",
    subtitle: "typo-short trim-line text-on-surface-light"
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
