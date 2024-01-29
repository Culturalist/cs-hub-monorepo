import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: "grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-gutter",
    card: "p-gutter",
    box: "h-m4 xs:w-m4 xs:h-m4 sm:w-m6 sm:h-m6 lg:w-m4 lg:h-m4",
    image: "w-full h-full object-contain",
    list: ""
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
