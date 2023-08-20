import { cx } from 'class-variance-authority';
import { Color, DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {
    cardSurface?: Color;
    coverOnHover?: boolean;
}

const defaultStyles = {
    container: 'group relative bg-theme-card-surface overflow-hidden flex justify-center items-center',
    box: 'h-m3 xs:w-m12 xs:h-m3 sm:w-m8 sm:h-m5',
    content: 'absolute z-10 inset-0 h-full px-16 pt-8 pb-16 flex flex-col justify-between gap-8 text-theme-card-text',
    titleWrapper: 'grow shrink min-h-0 pr-16 sm:pr-0',
    title: 'typo-title sm:typo-title-sm md:typo-title trim-line break-words md:break-normal hyphens-auto xs:hyphens-none line-clamp-3 sm:line-clamp-5 lg:line-clamp-6',
    subtitleWrapper: '',
    subtitle: 'typo-short trim-line min-w-0 whitespace-nowrap overflow-hidden text-ellipsis',
    cover: 'shrink-0 min-w-full min-h-full',
    onHover: 'invisible sm:group-hover:visible'
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
