import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'globals/utils';

export interface styleProps extends DefaultStyleProps {
    coverOnHover?: boolean;
    hero?: boolean;
}

const defaultStyles = {
    container: 'grid grid-cols-2 sm:grid-cols-3 gap-gutter',
    card: 'group relative bg-theme-card-surface overflow-hidden flex justify-center items-center',
    box: 'h-m4 xs:w-m6 xs:h-m4 sm:w-m8 sm:h-m5',
    content: 'absolute z-10 inset-0 h-full px-16 pt-8 pb-16 flex flex-col justify-between gap-8 text-theme-card-text',
    titleWrapper: 'grow shrink min-h-0',
    title: 'typo-title-sm md:typo-title trim-line break-words md:break-normal hyphens-auto sm:hyphens-none line-clamp-4 xs:line-clamp-5 lg:line-clamp-6',
    subtitleWrapper: '',
    subtitle: 'typo-short trim-line min-w-0 whitespace-nowrap overflow-hidden text-ellipsis',
    cover: 'w-full h-full',
    onHover: 'invisible sm:group-hover:visible',
    hero: {
        container: 'grid grid-cols-1 sm:grid-cols-3 gap-gutter',
        box: 'h-m3 xs:w-m12 xs:h-m3 sm:w-m8 sm:h-m5',
        titleWrapper: 'grow shrink min-h-0 pr-16 sm:pr-0',
        title: 'typo-title sm:typo-title-sm md:typo-title trim-line break-words md:break-normal hyphens-auto xs:hyphens-none line-clamp-3 sm:line-clamp-5 lg:line-clamp-6'
    }
};

export const createStyles = ({ className, hero, coverOnHover = true }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(hero ? defaultStyles.hero.container : defaultStyles.container, className),
        card: cx(defaultStyles.card, hero ? defaultStyles.hero.box : defaultStyles.box),
        cover: cx(defaultStyles.cover, coverOnHover ? defaultStyles.onHover : ''),
        titleWrapper: hero ? defaultStyles.hero.titleWrapper : defaultStyles.titleWrapper,
        title: hero ? defaultStyles.hero.title : defaultStyles.title
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
