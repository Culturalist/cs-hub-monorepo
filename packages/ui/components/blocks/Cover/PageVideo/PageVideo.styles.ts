import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'flex data-[trim=x]:flex-row data-[trim=y]:flex-col justify-center items-stretch overflow-hidden',
    box: 'h-m12 xs:w-m12 sm:w-m24 sm:h-m16 md:h-m12',
    video: 'object-cover'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, defaultStyles.box, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
