import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "",
    wrapper: "flex justify-center items-center overflow-hidden",
    box: "h-m12 xs:w-m12 sm:w-m24 sm:h-m16 md:h-m12",
    image: "w-full h-full",
    captionWrapper: "mt-4",
    caption: "typo-short-sm trim-line text-on-surface-light"
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className),
        wrapper: cx(defaultStyles.wrapper, defaultStyles.box)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
