import { cx } from 'class-variance-authority';
import { CardsType } from 'data/schemas';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {
    type: CardsType | 'hero';
}

const defaultStyles = {
    container: 'grid',
    manual: 'grid-cols-2 sm:grid-cols-3 gap-gutter',
    hero: 'grid-cols-1 sm:grid-cols-3 gap-gutter',
    projects: '',
    posts: '',
    people: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-gutter gap-y-40',
    events: '',
    organisations: 'grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-gutter'
};

export const createStyles = ({ className, type }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, defaultStyles[type], className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
