import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: '',
    connections: `typo-caps-xs flex flex-row gap-12 mt-gutter [&_*:not(:first-child)]:before:content-['/'] [&_*:not(:first-child)]:before:trim-line`,
    parentWrapper: '',
    parent: 'trim-line',
    labelWrapper: 'flex gap-12',
    label: 'trim-line',
    title: '',
    subtitleWrapper: 'mt-16 lg:max-w-m20',
    subtitle: 'typo-paragraph trim-line text-theme-text-light',
    lineup: 'mt-32',
    datesWrapper: 'mt-m2 mb-48 flex flex-col md:flex-row gap-32 md:gap-gutter md:justify-between md:items-end',
    dates: 'grow',
    action: 'grow-0',
    cover: 'mt-24',
    body: 'mb-m3'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
