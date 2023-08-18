import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'sm:container mx-auto px-offset py-gutter flex flex-col gap-module',
    navigation: 'typo-caps-sm flex flex-col sm:flex-row items-stretch flex-wrap gap-x-gutter gap-y-8 sm:gap-y-12',
    navLink: '',
    navLinkCaption: 'trim-line hover:text-theme-text-light',
    wrapper: 'flex flex-col items-start md:flex-row gap-8 md:gap-gutter text-theme-text-light',
    logoImage: 'h-32 invert-footer-logo',
    contactsWrapper: 'typo-short-sm self-stretch basis-full shrink-0 flex justify-between pt-8',
    contacts: 'flex flex-col md:flex-row flex-wrap gap-y-4 gap-x-gutter',
    social: 'flex flex-col md:flex-row items-end md:items-start gap-y-4 gap-x-gutter flex-nowrap',
    socialLink: 'underline hover:no-underline hover:text-theme-text',
    socialCaption: 'text-right'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
