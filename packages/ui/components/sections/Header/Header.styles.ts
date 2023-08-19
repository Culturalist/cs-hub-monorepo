import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'sm:container mx-auto h-header-height px-offset py-gutter flex flex-row gap-gutter items-center',
    wrapper: 'w-full flex flex-row gap-gutter lg:gap-module items-center text-theme-header-text',
    logo: '',
    logoImage: 'h-24 sm:h-40 invert-header-logo',
    defaultLogo: 'flex flex-row items-center gap-8 sm:gap-gutter',
    title: 'typo-caps-sm sm:typo-caps-lg trim-cap',
    line: 'flex-grow flex-shrink-0 basis-8 border-[0.5px] sm:border border-theme-header-text',
    markerWrapper: '',
    marker: 'typo-caps-sm sm:typo-caps-lg trim-cap font-light text-right whitespace-nowrap',
    menu: 'text-theme-header-text'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
