import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { LinksLayout, LinkCaptioned } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { localizeString } from "@cs/data/utils";
import LinkWrapper from "../LinkWrapper";
import { createStyles } from "./Links.styles";

interface LinksProps extends DefaultProps {
    links?: LinkCaptioned[];
    layout?: LinksLayout;
}

export default function Links(props: LinksProps) {
    const { links, layout, lang, className } = props;
    if (!links || links.length === 0) return null;

    const styles = createStyles({ className, layout });

    return (
        <div className={styles.container}>
            {links.map((link, i) => {
                const caption = localizeString(link.caption, lang);
                if (caption) {
                    return (
                        <LinkWrapper link={link.link} lang={lang} className={styles.link} key={i}>
                            <span className={styles.caption}>{caption}</span>
                            {link.link?.type === "file" && link.link.file && (
                                <DocumentArrowDownIcon className={styles.icon} />
                            )}
                        </LinkWrapper>
                    );
                }
                return null;
            })}
        </div>
    );
}
