import { cx } from 'class-variance-authority';
import { LinksLayout } from 'data/schemas';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {
    layout?: LinksLayout;
}

const defaultStyles = {
    container: 'flex',
    link: '',
    caption: '',
    icon: '',
    links: {
        container: 'flex-col sm:flex-row flex-wrap whitespace-nowrap gap-y-gutter gap-x-module',
        link: 'text-theme-text underline decoration-2 underline-offset-4 hover:no-underline w-fit',
        caption: 'typo-caps-xl trim-line font-light',
        icon: 'hidden'
    },
    list: {
        container: 'flex-col w-full md:max-w-m16 border-t border-theme-text/80',
        link: 'px-16 pt-12 pb-20 flex flex-row justify-between text-theme-text hover:text-theme-card-surface border-b border-theme-text/80',
        caption: 'typo-title trim-line',
        icon: 'w-24 h-24 shrink-0 stroke-1 mt-4 -mb-4'
    },
    buttons: {
        container: 'flex-col sm:flex-row flex-wrap whitespace-nowrap gap-y-12 gap-x-gutter',
        link: 'h-48 px-24 py-12 flex flex-row gap-24 justify-center items-center w-fit bg-theme-text text-theme-surface hover:bg-theme-card-surface hover:text-theme-card-text rounded-full',
        caption: 'typo-caps trim-cap',
        icon: 'w-28 h-28 shrink-0 stroke-1 -mr-8'
    }
};

export const createStyles = ({ className, layout = 'list' }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, defaultStyles[layout].container, className),
        link: cx(defaultStyles.link, defaultStyles[layout].link),
        caption: cx(defaultStyles.caption, defaultStyles[layout].caption),
        icon: cx(defaultStyles.icon, defaultStyles[layout].icon)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
