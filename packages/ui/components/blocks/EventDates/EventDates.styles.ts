import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'flex flex-col gap-x-gutter gap-y-gutter sm:max-md:gap-y-module',
    event: 'flex flex-row gap-gutter items-stretch',
    dateWrapper: 'basis-m3 sm:basis-m6 md:basis-m5 lg:basis-m4 shrink-0',
    date: 'typo-caps-2xl trim-line',
    details: 'typo-short flex flex-col justify-center sm:gap-4 mt-8',
    time: 'trim-line',
    locationLink: 'underline hover:no-underline hover:text-theme-card-surface',
    locationWrapper: '',
    location: 'trim-line'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
