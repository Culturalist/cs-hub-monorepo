import { cx } from "class-variance-authority";
import { CoverParent } from "@cs/data/schemas";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {
    parent: CoverParent;
}

const defaultStyles = {
    container: "",
    image: "",
    video: ""
};

export const createStyles = ({ className, parent }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
