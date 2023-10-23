import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {}

const defaultStyles = {
    button: "flex flex-row items-center gap-8 pb-1 border-b border-dashed",
    title: "typo-caps-2xs trim-cap",
    icon: "",
    plus: "w-16",
    minus: "hidden w-16"
};

export const createStyles = ({ className }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        button: cx(defaultStyles.button, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
