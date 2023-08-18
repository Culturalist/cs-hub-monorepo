import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: ''
};

export const createStyles = ({ className }: styleProps) => {
    return purgeEmptyStrings({
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    });
};

export type Styles = ReturnType<typeof createStyles> & Partial<typeof defaultStyles>;
