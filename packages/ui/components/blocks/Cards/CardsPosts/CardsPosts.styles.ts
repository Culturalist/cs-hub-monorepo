import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'globals/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-gutter gap-y-32',
    card: '',
    wrapper: '',
    cover: 'h-m8 xs:w-m12 md:w-m8 md:h-m5',
    box: 'bg-theme-text-light/25',
    titleWrapper: 'mt-4',
    title: 'typo-title-lg trim-line hyphens-auto xs:hyphens-none',
    authorWrapper: 'mt-16',
    author: 'typo-caps-2xs trim-line text-theme-text-light'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className),
        box: cx(defaultStyles.cover, defaultStyles.box)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
