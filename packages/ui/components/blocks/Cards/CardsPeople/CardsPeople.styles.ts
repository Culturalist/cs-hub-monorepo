import { cx } from "class-variance-authority";
import { DefaultStyleProps } from "@cs/globals";
import { purgeEmptyStrings } from "@cs/globals/utils";

export interface StyleProps extends DefaultStyleProps {
    monochrome?: boolean;
}

const defaultStyles = {
    container: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-gutter gap-y-40",
    card: "",
    linkWrapper: "",
    photo: "xs:w-m12 xs:h-m12 md:w-m8 md:h-m8 mb-12 object-cover",
    box: "h-0 pb-[100%] mb-12 bg-on-surface-light/25",
    nameWrapper: "",
    name: "typo-caps-sm trim-line",
    subtitleWrapper: "",
    subtitle: "typo-short-lg trim-line text-on-surface-light",
    description: "typo-paragraph-sm mt-16 [&_p:not(:first-child)]:pt-16 [&_p]:trim-line [&_a:hover]:text-primary",
    contacts:
        "typo-paragraph-sm mt-16 [&_span]:trim-line [&_a]:underline [&_a:hover]:no-underline [&_a:hover]:text-primary"
};

export const createStyles = ({ className, monochrome }: StyleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className),
        photo: cx(defaultStyles.photo, monochrome ? "grayscale" : "")
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
