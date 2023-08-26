import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'typo-caps-sm flex flex-col sm:flex-row items-stretch flex-wrap gap-x-20 gap-y-8 xs:gap-y-12',
    link: 'underline hover:no-underline hover:text-theme-card-surface w-fit',
    caption: 'trim-line'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
