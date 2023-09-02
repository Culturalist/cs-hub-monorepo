import React from 'react';
import { PortableText as PortableTextRender, PortableTextComponents } from '@portabletext/react';
import { createStyles } from './PortableText.styles';
import { DefaultProps } from 'globals';
import { BlockParent, LocalePortableText } from 'data/schemas';
import LinkWrapper from '../LinkWrapper';
import { neatChildrenBreaks } from 'globals/utils';
import globalConfig from 'globals/globalConfig';

interface PortableTextBlockProps extends DefaultProps {
    data?: LocalePortableText;
    parent: BlockParent;
}

export default function PortableText(props: PortableTextBlockProps) {
    const { lang, parent, id, className } = props;
    const styles = createStyles({ parent, className });
    const data =
        props.data?.[lang] ||
        (globalConfig.localization.safeReplace ? props.data?.[globalConfig.localization.default] : undefined);

    const components: PortableTextComponents = {
        marks: {
            strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
            underline: ({ children }) => <span className={styles.underline}>{children}</span>,
            'strike-through': ({ children }) => <span className={styles.strikethrough}>{children}</span>,
            // em: ({ children }) => <em>{children}</em>,
            link: ({ value, children }) => (
                <LinkWrapper link={value} lang={lang} className={styles.link}>
                    {children}
                </LinkWrapper>
            )
        },
        list: {
            bullet: ({ children }) => <ul className={styles.ul}>{neatChildrenBreaks(children, 2)}</ul>,
            number: ({ children }) => <ol className={styles.ol}>{neatChildrenBreaks(children, 2)}</ol>
        },
        block: {
            normal: ({ children }) => (
                <p className={styles.normalWrapper}>
                    <span className={styles.normal}>{neatChildrenBreaks(children, 2)}</span>
                </p>
            ),
            lead: ({ children }) => (
                <p className={styles.leadWrapper}>
                    <span className={styles.lead}>{neatChildrenBreaks(children, 2)}</span>
                </p>
            ),
            small: ({ children }) => (
                <p className={styles.smallWrapper}>
                    <span className={styles.small}>{neatChildrenBreaks(children, 2)}</span>
                </p>
            ),
            h3: ({ children }) => (
                <h3 className={styles.h3Wrapper}>
                    <span className={styles.h3}>{neatChildrenBreaks(children, 2)}</span>
                </h3>
            ),
            h4: ({ children }) => (
                <h4 className={styles.h4Wrapper}>
                    <span className={styles.h4}>{neatChildrenBreaks(children, 2)}</span>
                </h4>
            )
        },
        types: {
            // blockImage: ({ value }) => <BlockImage source={value} lang={lang} className={styles.block} />,
            // blockVideo: ({ value }) => <BlockVideo data={value} lang={lang} className={styles.block} />
        }
    };
    if (!data) {
        return null;
    }
    return (
        <div id={id} className={styles.container}>
            <PortableTextRender value={data} components={components} />
        </div>
    );
}
