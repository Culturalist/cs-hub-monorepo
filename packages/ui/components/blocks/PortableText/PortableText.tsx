import React from 'react';
import { PortableText as PortableTextRender, PortableTextComponents } from '@portabletext/react';
import { createStyles } from './PortableText.styles';
import { DefaultProps } from 'globals';
import { BlockParent, LocalePortableText } from 'data/schemas';
import LinkWrapper from '../LinkWrapper';
import { neatChildrenBreaks } from 'weresk/utils';

interface PortableTextBlockProps extends DefaultProps {
    data?: LocalePortableText;
    parent: BlockParent;
}

export default function PortableText(props: PortableTextBlockProps) {
    const { data, lang, parent, id, className } = props;
    const styles = createStyles({ parent, className });

    const components: PortableTextComponents = {
        marks: {
            strong: ({ children }) => <strong className={styles.strong}>{children}</strong>,
            underline: ({ children }) => <span className={styles.underline}>{children}</span>,
            'strike-through': ({ children }) => <span className={styles.strikethrough}>{children}</span>,
            // em: ({ children }) => <em>{children}</em>,
            link: ({ value, children }) => (
                <LinkWrapper link={value?.link} lang={lang} className={styles.link}>
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
                <div className={styles.normalWrapper}>
                    <p className={styles.normal}>{neatChildrenBreaks(children, 2)}</p>
                </div>
            ),
            lead: ({ children }) => (
                <div className={styles.leadWrapper}>
                    <p className={styles.lead}>{neatChildrenBreaks(children, 2)}</p>
                </div>
            ),
            small: ({ children }) => (
                <div className={styles.smallWrapper}>
                    <p className={styles.small}>{neatChildrenBreaks(children, 2)}</p>
                </div>
            ),
            h2: ({ children }) => (
                <div className={styles.h2Wrapper}>
                    <p className={styles.h2}>{neatChildrenBreaks(children, 2)}</p>
                </div>
            ),
            h3: ({ children }) => (
                <div className={styles.h3Wrapper}>
                    <p className={styles.h3}>{neatChildrenBreaks(children, 2)}</p>
                </div>
            )
        },
        types: {
            // blockImage: ({ value }) => <BlockImage source={value} lang={lang} className={styles.block} />,
            // blockVideo: ({ value }) => <BlockVideo data={value} lang={lang} className={styles.block} />
        }
    };
    if (!data || !data[lang]) {
        return null;
    }
    return (
        <div id={id} className={styles.container}>
            <PortableTextRender value={data[lang]} components={components} />
        </div>
    );
}
