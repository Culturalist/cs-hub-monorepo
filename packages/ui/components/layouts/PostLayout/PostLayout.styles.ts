import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'globals/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'mb-m3',
    connectionsWrapper: 'mt-gutter flex flex-row flex-wrap items-end justify-between gap-32',
    connections: `typo-caps-xs flex flex-row gap-12 [&_*:not(:first-child)]:before:content-['/'] [&_*:not(:first-child)]:before:trim-line`,
    parentWrapper: '',
    parent: 'trim-line',
    labelWrapper: 'flex gap-12',
    label: 'trim-line',
    details: 'max-sm:grow flex sm:flex-row justify-between gap-20 text-theme-text-light',
    authorWrapper: '',
    author: 'typo-caps-2xs trim-line',
    dateWrapper: '',
    date: 'typo-caps-2xs trim-line',
    title: '',
    subtitleWrapper: 'mt-8 sm:mt-16 lg:max-w-m20',
    subtitle: 'typo-paragraph trim-line text-theme-text-light',
    cover: 'mt-24',
    body: ''
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
