import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'globals/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-gutter gap-y-module',
    group: 'pr-module',
    labelWrapper: 'mb-12',
    label: 'typo-title-sm trim-line text-theme-text-light',
    list: 'flex flex-col gap-8',
    person: '',
    nameWrapper: '',
    name: 'typo-caps-sm trim-line',
    subtitleWrapper: 'mb-4',
    subtitle: 'typo-short trim-line text-theme-text-light'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
