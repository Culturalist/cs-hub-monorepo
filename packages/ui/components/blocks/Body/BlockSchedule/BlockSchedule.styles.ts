import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'mt-40',
    element: 'border-t pt-8 sm:pt-16 pb-24 flex flex-col sm:flex-row gap-gutter',
    timeCol: 'basis-48 sm:basis-m8 md:basis-m6 shrink-0',
    timeWrapper: '',
    time: 'typo-title-lg font-light trim-line',
    contentCol: 'lg:pr-module',
    titleWrapper: '',
    title: 'typo-title-lg trim-line',
    subtitleWrapper: 'mt-8',
    subtitle: 'typo-paragraph-sm text-theme-text-light',
    description: 'typo-paragraph-sm mt-16 [&_p]:mt-16'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
