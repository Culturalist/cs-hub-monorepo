import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'globals/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'mb-m3',
    name: '',
    subtitleWrapper: 'mt-8',
    subtitle: 'typo-paragraph trim-line text-theme-text-light',
    wrapper: 'flex flex-col sm:flex-row gap-24 sm:gap-gutter mt-32',
    photoWrapper: 'shrink-0 sm:pr-module',
    photo: 'xs:w-m12 xs:h-m12',
    captionWrapper: 'mt-4',
    caption: 'typo-short-sm trim-line text-theme-text-light',
    info: '',
    contacts:
        'typo-paragraph-sm flex flex-col gap-4 [&_span]:trim-line [&_a]:underline [&_a:hover]:no-underline [&_a:hover]:text-theme-card-surface',
    description:
        'typo-paragraph-sm mb-16 [&_p:not(:first-child)]:pt-16 [&_p]:trim-line [&_a:hover]:text-theme-card-surface'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
