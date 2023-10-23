import { cx } from "class-variance-authority";
import { MediaLayout } from "@cs/data/schemas";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {
    layout: MediaLayout;
}

const defaultStyles = {
    container: "mt-40 grid grid-cols-1 gap-offset sm:gap-gutter",
    wrapper: "",
    image: "w-full",
    video: "w-full",
    captionWrapper: "mt-4",
    caption: "typo-short-sm trim-line text-on-surface-light",
    layout: {
        full: "",
        "2-columns": "sm:grid-cols-2",
        "3-columns": "sm:grid-cols-2 md:grid-cols-3"
    }
};

export const createStyles = ({ className, layout = "full" }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, defaultStyles.layout[layout], className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
