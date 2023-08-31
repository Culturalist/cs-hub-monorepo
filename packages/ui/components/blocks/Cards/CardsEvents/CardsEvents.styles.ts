import { cx } from 'class-variance-authority';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {}

const defaultStyles = {
    container: 'grid grid-cols-1 sm:grid-cols-2 gap-offset sm:gap-gutter',
    card: 'text-theme-card-text bg-theme-card-surface',
    wrapper: 'p-20 pt-8 sm:p-gutter sm:pt-8 flex flex-row items-stretch min-h-m4',
    dates: 'basis-m3 shrink-0 flex flex-col justify-between items-start gap-12 sm:max-md:gap-8',
    startWrapper: '',
    start: 'typo-caps sm:max-md:typo-caps-sm trim-line',
    lineWrapper: 'basis-auto grow flex flex-col items-center gap-12 sm:max-md:gap-8',
    line: 'basis-0 grow w-[2px] bg-theme-card-text',
    endWrapper: '',
    end: 'typo-caps sm:max-md:typo-caps-sm trim-cap',
    timeWrapper: '',
    time: 'typo-short sm:max-md:typo-short-sm trim-line',
    info: 'flex flex-col justify-between',
    titleWrapper: '',
    title: 'typo-title-lg sm:max-md:typo-title trim-line hyphens-auto xs:hyphens-none',
    lineup: 'flex flex-row flex-wrap gap-x-12 gap-y-4',
    nameWrapper: '',
    name: 'typo-caps-2xs sm:max-md:typo-caps-3xs trim-line xs:whitespace-nowrap',
    cover: 'object-cover',
    box: 'w-m12 h-m8 bg-theme-text'
};

export const createStyles = ({ className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className),
        cover: cx(defaultStyles.cover, defaultStyles.box)
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
