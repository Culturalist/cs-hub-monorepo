import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'sm:container mx-auto h-header-height px-offset py-gutter flex flex-row gap-gutter items-center',
    wrapper: 'w-full flex flex-row gap-gutter items-center text-theme-header-text',
    logo: '',
    logoImage: 'h-40 invert-header-logo',
    defaultLogo: 'flex flex-row items-center gap-gutter',
    title: 'typo-caps-lg trim-cap',
    line: 'flex-grow flex-shrink-0 basis-0 border border-theme-header-text',
    markerWrapper: '',
    marker: 'typo-caps-lg trim-cap font-light text-right whitespace-nowrap',
    menu: 'text-theme-header-text'
};

export const createStyles = ({ className }: styleProps) => {
    return purgeEmptyStrings({
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    });
};

export type Styles = ReturnType<typeof createStyles> & Partial<typeof defaultStyles>;
