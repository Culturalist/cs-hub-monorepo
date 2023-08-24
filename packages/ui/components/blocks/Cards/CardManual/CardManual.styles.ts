import { cx } from 'class-variance-authority';
import { Color, DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {
    cardSurface?: Color;
    coverOnHover?: boolean;
}

const defaultStyles = {
    container: 'group relative bg-theme-card-surface overflow-hidden flex justify-center items-center',
    box: 'h-m4 xs:w-m6 xs:h-m4 sm:w-m8 sm:h-m5',
    content: 'absolute z-10 inset-0 h-full px-16 pt-8 pb-16 flex flex-col justify-between gap-8 text-theme-card-text',
    titleWrapper: 'grow shrink min-h-0',
    title: 'typo-title-sm md:typo-title trim-line break-words md:break-normal hyphens-auto sm:hyphens-none line-clamp-4 sm:line-clamp-5 lg:line-clamp-6',
    subtitleWrapper: '',
    subtitle: 'typo-short trim-line min-w-0 whitespace-nowrap overflow-hidden text-ellipsis',
    cover: '',
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
