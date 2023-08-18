import { cx } from 'class-variance-authority';
import { BlockParent } from 'data/schemas';
import { DefaultStyleProps } from 'globals';
import { purgeEmptyStrings } from 'weresk/utils';

export interface styleProps extends DefaultStyleProps {
    parent?: BlockParent;
}

const defaultStyles = {
    container: '',
    normalWrapper: '',
    normal: '',
    leadWrapper: '',
    lead: '',
    smallWrapper: '',
    small: '',
    h2Wrapper: '',
    h2: '',
    h3Wrapper: '',
    h3: '',
    link: 'underline hover:no-underline hover:text-theme-text',
    underline: '',
    strikethrough: '',
    strong: '',
    ul: '',
    ol: '',
    field: {
        normal: '',
        link: ''
    }
};

export const createStyles = ({ parent = 'body', className }: styleProps) => {
    const styles = {
        ...defaultStyles,
        container: cx(defaultStyles.container, className)
        // normalWrapper: defaultStyles.normalWrapper[parent],
        // leadWrapper: defaultStyles.leadWrapper[parent],
        // leadSmWrapper: defaultStyles.leadSmWrapper[parent],
        // smallWrapper: defaultStyles.smallWrapper[parent]
    };
    return purgeEmptyStrings(styles) as Partial<typeof styles>;
};

export type Styles = ReturnType<typeof createStyles>;
