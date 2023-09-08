import { cx } from 'class-variance-authority';
import { BlockParent } from 'data/schemas';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'globals/utils';

export interface styleProps extends DefaultStyleProps {
    parent?: BlockParent;
}

const defaultStyles = {
    container: '',
    leadWrapper: 'mt-40 lg:max-w-m20',
    lead: 'typo-lead trim-line hyphens-auto xs:hyphens-none',
    normalWrapper: 'mt-20 lg:max-w-m20',
    normal: 'typo-paragraph trim-line',
    smallWrapper: 'mt-20 md:max-w-m12 text-theme-text-light',
    small: 'typo-paragraph-sm trim-line',
    h3Wrapper: 'mt-40 lg:max-w-m20',
    h3: 'typo-caps trim-line',
    h4Wrapper: 'mt-20 lg:max-w-m20',
    h4: 'typo-paragraph trim-line font-normal',
    link: 'underline hover:no-underline hover:text-theme-card-surface',
    underline: 'underline',
    strikethrough: 'line-through',
    strong: 'font-normal',
    ul: 'list-disc pl-[1em] typo-paragraph trim-line flex flex-col mt-20 gap-8',
    ol: 'list-decimal pl-[1em] typo-paragraph trim-line flex flex-col mt-20 gap-8',
    field: {
        normalWrapper: '',
        normal: 'trim-line'
    },
    imageWrapper: 'mt-40',
    image: '',
    captionWrapper: 'mt-4',
    caption: 'typo-short-sm trim-line text-theme-text-light'
};

export const createStyles = ({ parent = 'body', className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className),
        normalWrapper: parent == 'field' ? defaultStyles.field.normalWrapper : defaultStyles.normalWrapper,
        normal: parent == 'field' ? defaultStyles.field.normal : defaultStyles.normal
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
