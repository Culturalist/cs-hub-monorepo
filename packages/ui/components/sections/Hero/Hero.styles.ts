import { cx } from 'class-variance-authority';
import { Theme } from 'data/schemas';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {
    leadLength: number;
}

type LeadSize = 'short' | 'medium' | 'long';

const defaultStyles = {
    container: 'hero',
    wrapper: 'h-hero-height pb-offset flex flex-col gap-module justify-between',
    leadWrapper: '',
    lead: 'trim-line text-outline break-words sm:break-normal hyphens-auto sm:hyphens-none text-theme-text',
    short: 'typo-caps-huge',
    medium: 'typo-caps-3xl',
    long: 'typo-caps-2xl',
    cards: '',
    links: 'mb-gutter',
    bg: 'absolute -z-50 inset-0 w-full h-[100svh] bg-theme-surface',
    cover: 'w-full h-full'
};

export const createStyles = ({ className, leadLength }: styleProps) => {
    const leadSize: LeadSize = leadLength < 30 ? 'short' : leadLength < 120 ? 'medium' : 'long';
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className),
        lead: cx(defaultStyles.lead, defaultStyles[leadSize])
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
