import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';

export interface styleProps extends DefaultStyleProps {
    open: boolean;
}

const defaultStyles = {
    button: 'relative basis-32 h-32 shrink-0 grow-0',
    icon: 'absolute z-50 top-0 left-0',
    wrapper:
        'absolute z-40 top-0 left-0 w-full h-screen py-header-height bg-theme-surface flex flex-col items-center justify-between gap-gutter transitiion-opacity duration-300',
    navigation: 'flex flex-col items-center gap-gutter',
    linkWrapper: '',
    link: 'typo-caps-3xl trim-line hover:text-outline',
    languages: '',
    state: {
        open: '',
        closed: 'opacity-0 pointer-events-none'
    }
};

export const createStyles = ({ open, className }: styleProps) => {
    return {
        ...defaultStyles,
        button: cx(defaultStyles.button, className),
        menuIcon: cx(defaultStyles.state[!open ? 'open' : 'closed'], defaultStyles.icon),
        closeIcon: cx(defaultStyles.state[open ? 'open' : 'closed'], defaultStyles.icon),
        wrapper: cx(defaultStyles.state[open ? 'open' : 'closed'], defaultStyles.wrapper)
    };
};

export type Styles = ReturnType<typeof createStyles>;
