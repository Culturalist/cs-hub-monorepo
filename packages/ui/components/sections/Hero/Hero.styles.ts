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
    wrapper: 'h-hero-height px-offset pb-gutter flex flex-col gap-module justify-between',
    bg: 'absolute -z-50 inset-0 w-full h-[100dvh] bg-theme-surface',
    leadWrapper: '',
    lead: 'trim-line text-outline hyphens-auto sm:hyphens-none text-theme-text',
    short: 'typo-caps-huge',
    medium: 'typo-caps-3xl',
    long: 'typo-caps-2xl',
    cards: ''
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