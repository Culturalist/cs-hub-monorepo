import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: '',
    linkWrapper: '',
    photo: 'xs:w-m12 xs:h-m12 md:w-m8 md:h-m8 mb-12 object-cover',
    box: 'h-0 pb-[100%] mb-12 bg-theme-text-light/25',
    nameWrapper: '',
    name: 'typo-caps-sm trim-line',
    positionWrapper: 'mt-4',
    position: 'typo-short-lg trim-line text-theme-text-light',
    description:
        'typo-paragraph-sm mt-16 [&_p:not(:first-child)]:pt-16 [&_p]:trim-line [&_a:hover]:text-theme-card-surface',
    contacts:
        'typo-paragraph-sm mt-16 [&_span]:trim-line [&_a]:underline [&_a:hover]:no-underline [&_a:hover]:text-theme-card-surface'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
