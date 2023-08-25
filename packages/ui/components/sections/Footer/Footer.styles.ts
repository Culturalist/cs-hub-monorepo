import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'xs:container mx-auto p-offset flex flex-col gap-32',
    navigation: 'typo-caps-sm flex flex-col xs:flex-row items-stretch flex-wrap gap-x-20 gap-y-8 xs:gap-y-12',
    navLink: '',
    navLinkCaption: 'trim-line hover:text-theme-text-light',
    wrapper: 'flex flex-col items-start sm:flex-row gap-8 sm:gap-gutter text-theme-text-light',
    logoImage: 'h-32 invert-footer-logo',
    contactsWrapper: 'typo-short grow shrink self-stretch flex justify-between gap-gutter pt-[6px]',
    contacts: 'flex flex-col md:flex-row flex-wrap gap-y-4 gap-x-gutter',
    social: 'flex flex-col md:flex-row justify-end items-end gap-y-4 gap-x-gutter flex-nowrap',
    socialLink: 'underline hover:no-underline hover:text-theme-text [&_span]:text-right'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
