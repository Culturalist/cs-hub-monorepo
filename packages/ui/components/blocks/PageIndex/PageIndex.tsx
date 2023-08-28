import { BodyBlock } from 'data/schemas';
import { DefaultProps } from 'globals';
import { localizeString } from 'data/utils';
import LinkWrapper from '../LinkWrapper';
import { createStyles } from './PageIndex.styles';

export interface IndexLink {
    caption: string;
    link: {
        _type: 'linkTyped';
        type: 'anchor';
        anchor: string;
    };
}

interface PageIndexProps extends DefaultProps {
    body?: BodyBlock[];
}

export default function PageIndex(props: PageIndexProps) {
    const { body, lang, className } = props;
    const styles = createStyles({ className });

    let index: IndexLink[] = [];
    body &&
        body.forEach(block => {
            const caption = localizeString(block.indexTitle, lang) || localizeString(block.title, lang);
            if (block._type.startsWith('blockSection') && caption && block.blockId?.current) {
                index.push({
                    caption,
                    link: {
                        _type: 'linkTyped',
                        type: 'anchor',
                        anchor: block.blockId.current
                    }
                });
            }
        });

    if (index.length == 0) return null;

    return (
        <div className={styles.container}>
            {index.map((item, i) => (
                <LinkWrapper link={item.link} lang={lang} className={styles.link} key={i}>
                    <span className={styles.caption}>{item.caption}</span>
                </LinkWrapper>
            ))}
        </div>
    );
}
