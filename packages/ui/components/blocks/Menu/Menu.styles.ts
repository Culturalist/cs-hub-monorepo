import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {
    open: boolean;
}

const defaultStyles = {
    button: 'relative basis-24 h-24 sm:basis-32 sm:h-32 shrink-0 grow-0',
    icon: 'absolute z-50 top-0 left-0 w-24 h-24 sm:w-32 sm:h-32',
    close: 'text-theme-text',
    menu: 'text-theme-header-text',
    wrapper:
        'absolute z-40 top-0 left-0 w-full h-screen py-header-height bg-theme-surface flex flex-col items-center justify-between gap-gutter transitiion-opacity duration-300',
    navigation: 'flex flex-col items-center gap-gutter',
    link: '',
    linkCaption: 'typo-caps-3xl trim-line hover:text-outline',
    languages: '',
    state: {
        open: '',
        closed: 'opacity-0 pointer-events-none'
    }
};

export const createStyles = ({ open, className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        button: cx(defaultStyles.button, className),
        menuIcon: cx(defaultStyles.state[!open ? 'open' : 'closed'], defaultStyles.icon, defaultStyles.menu),
        closeIcon: cx(defaultStyles.state[open ? 'open' : 'closed'], defaultStyles.icon, defaultStyles.close),
        wrapper: cx(defaultStyles.state[open ? 'open' : 'closed'], defaultStyles.wrapper)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
