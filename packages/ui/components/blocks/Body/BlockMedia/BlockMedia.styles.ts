import { cx } from 'class-variance-authority';
import { MediaLayout } from 'data/schemas';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'globals/utils';

export interface styleProps extends DefaultStyleProps {
    layout: MediaLayout;
}

const defaultStyles = {
    container: 'mt-40 grid grid-cols-1 gap-offset sm:gap-gutter',
    wrapper: '',
    image: 'w-full',
    video: 'w-full',
    captionWrapper: 'mt-4',
    caption: 'typo-short-sm trim-line text-theme-text-light',
    layout: {
        full: '',
        '2-columns': 'sm:grid-cols-2',
        '3-columns': 'sm:grid-cols-2 md:grid-cols-3'
    }
};

export const createStyles = ({ className, layout = 'full' }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, defaultStyles.layout[layout], className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
