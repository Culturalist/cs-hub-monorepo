import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container:
        'absolute container top-0 left-1/2 -translate-x-1/2 z-[9999] w-full h-full overflow-hidden pointer-events-none',
    rows: 'absolute w-full h-full fill-rows mt-offset opacity-10',
    columns: 'grid-columns absolute w-full h-full grid px-offset gap-x-gutter',
    column: 'bg-red opacity-10',
    grid: 'absolute w-full h-full fill-grid opacity-20'
};

export const createStyles = ({ className }: styleProps) => {
    return {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
};

export type Styles = ReturnType<typeof createStyles>;
