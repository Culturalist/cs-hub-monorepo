import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "mb-m3",
    connectionsWrapper: "mt-gutter flex flex-col sm:flex-row sm:flex-wrap sm:items-end sm:justify-between gap-32",
    connections: `typo-caps-xs flex flex-row gap-12 mt-gutter [&_*:not(:first-child)]:before:content-['/'] [&_*:not(:first-child)]:before:trim-line`,
    parentWrapper: "",
    parent: "trim-line",
    labelWrapper: "flex gap-12",
    label: "trim-line",
    details: "",
    dateWrapper: "typo-caps-2xs text-on-surface-light",
    date: "trim-line",
    titleWrapper: "mt-4",
    title: "trim-line",
    subtitleWrapper: "mt-16 lg:max-w-m20",
    subtitle: "typo-paragraph trim-line text-on-surface-light",
    organisations: "mt-32",
    cover: "mt-32 mb-40",
    body: ""
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
