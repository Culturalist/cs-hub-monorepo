import { AdaptiveDimentions, box, boxPx, breakpoints } from '../../../../utils';
import { CoverBlock, Post } from 'data/schemas';
import { Breakpoint, DefaultProps } from 'globals';
import { getImageUrl } from 'globals/lib/sanity';
import { localizeString, wrapReference } from 'data/utils';
import { mapKeys, neatTextBreaks } from 'globals/utils';
import { createStyles } from './CardsPosts.styles';
import LinkWrapper from '../../LinkWrapper';
import Image from '../../Image';

interface CardsPostsProps extends DefaultProps {
    data: Post[];
}

export default function CardsPosts(props: CardsPostsProps) {
    const { data, lang, className } = props;
    const styles = createStyles({ className });

    const sizes: AdaptiveDimentions = {
        xs: box([12, 8], 'xs'),
        sm: box([12, 8], 'sm'),
        md: box([8, 5], 'md'),
        lg: box([8, 5], 'lg')
    };

    return (
        <div className={styles.container}>
            {data.map((card, i) => {
                const { covers } = card;
                const title = neatTextBreaks(localizeString(card.title, lang));
                const author = neatTextBreaks(localizeString(card.author?.title, lang));
                let cover: CoverBlock | undefined;

                covers &&
                    covers.length > 0 &&
                    covers.every(nextCover => {
                        if (nextCover._type == 'coverImage') {
                            cover = nextCover;
                        }
                        return !nextCover.useMedia?.includes('desktop');
                    });

                const coverUrls =
                    cover &&
                    mapKeys<Breakpoint, string>(breakpoints, (br: Breakpoint) =>
                        getImageUrl(cover!, ...boxPx(sizes, br))
                    );

                return (
                    <div className={styles.card} key={i}>
                        <LinkWrapper link={wrapReference(card)} className={styles.wrapper}>
                            {cover ? (
                                <Image
                                    sources={coverUrls}
                                    sizes={sizes}
                                    alt={card.title}
                                    lang={lang}
                                    className={styles.cover}
                                />
                            ) : (
                                <div className={styles.box}></div>
                            )}
                            {title && (
                                <h4 className={styles.titleWrapper}>
                                    <span className={styles.title}>{title}</span>
                                </h4>
                            )}
                        </LinkWrapper>
                        {author && (
                            <p className={styles.authorWrapper}>
                                <span className={styles.author}>{author}</span>
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
