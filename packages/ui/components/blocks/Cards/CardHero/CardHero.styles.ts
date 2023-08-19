import { cx } from 'class-variance-authority';
import { Color, DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {
    cardSurface?: Color;
    coverOnHover?: boolean;
}

const defaultStyles = {
    container: 'group relative bg-theme-card-surface overflow-hidden flex justify-center items-center',
    box: 'h-m3 sm:box-12x3 md:box-6x4 lg:box-8x5',
    content: 'absolute z-10 inset-0 h-full px-16 pt-8 pb-16 flex flex-col justify-between gap-8 text-theme-card-text',
    titleWrapper: 'grow shrink min-h-0 pr-16 md:pr-0',
    title: 'typo-title trim-line hyphens-auto sm:hyphens-none line-clamp-3 md:line-clamp-5 lg:line-clamp-6',
    subtitleWrapper: '',
    subtitle: 'typo-short trim-line min-w-0 whitespace-nowrap overflow-hidden text-ellipsis',
    cover: 'shrink-0 min-w-full min-h-full',
    onHover: 'invisible group-hover:visible'
};

export const createStyles = ({ className, cardSurface, coverOnHover = true }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, defaultStyles.box, className),
        cover: cx(defaultStyles.cover, coverOnHover ? defaultStyles.onHover : ''),
        cardSurface: cardSurface ? { backgroundColor: cardSurface.hex } : undefined
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
