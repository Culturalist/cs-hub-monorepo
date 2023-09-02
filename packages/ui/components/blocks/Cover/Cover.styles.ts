import { cx } from 'class-variance-authority';
import { CoverParent } from 'data/schemas';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'globals/utils';

export interface styleProps extends DefaultStyleProps {
    parent: CoverParent;
}

const defaultStyles = {
    container: '',
    image: '',
    video: ''
};

export const createStyles = ({ className, parent }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
