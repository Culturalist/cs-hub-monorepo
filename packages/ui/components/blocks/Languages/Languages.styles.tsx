import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'globals/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: `typo-caps font-light flex flex-row flex-nowrap justify-end gap-8 uppercase tracking-wider [&_li:not(:first-child)]:before:content-['/'] [&_li:not(:first-child)]:before:mr-8 [&_li:not(:first-child)]:before:text-theme-text-light/20`,
    link: 'text-theme-text-light hover:text-theme-text',
    caption: ''
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
