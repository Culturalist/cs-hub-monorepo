import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: ''
};

export const createStyles = ({ className }: styleProps) => {
    return {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
};

export type Styles = ReturnType<typeof createStyles>;
