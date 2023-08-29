import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'mb-m3',
    name: '',
    positionWrapper: 'mt-8',
    position: 'typo-paragraph trim-line text-theme-text-light',
    wrapper: 'flex flex-col sm:flex-row gap-24 sm:gap-gutter mt-32',
    photo: 'xs:w-m12 xs:h-m12 sm:mr-module',
    info: '',
    contacts:
        'typo-paragraph-sm flex flex-col gap-4 mb-16 [&_span]:trim-line [&_a]:underline [&_a:hover]:no-underline [&_a:hover]:text-theme-card-surface',
    description:
        'typo-paragraph-sm [&_p:not(:first-child)]:pt-16 [&_p]:trim-line text-theme-text-light [&_a:hover]:text-theme-card-surface'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
