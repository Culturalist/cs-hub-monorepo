import { wrapReference } from 'data/utils';
import { Footer } from 'data/schemas';
import { DefaultProps } from 'globals';
import { globalConfig } from 'globals';
import { getImageUrl } from 'globals/lib/sanity';
import { localizeString } from 'data/utils';
import { LinkWrapper, PortableText, LinkContact } from '../../blocks';
import { createStyles } from './Footer.styles';

interface FooterProps extends DefaultProps {
    data?: Footer;
}

export default function Footer(props: FooterProps) {
    const { data, lang, className } = props;
    if (!data) return null;

    const { contacts, links, social } = data;
    const logoUrl = data.logo && getImageUrl(data.logo);
    const styles = createStyles({ className });

    return (
        <footer className={styles.container}>
            {/* NAVIGATION */}
            {links && links.length > 0 && (
                <nav className={styles.navigation}>
                    {links.map((link, i) => {
                        if (link._type !== 'reference') {
                            return (
                                <LinkWrapper link={wrapReference(link)} lang={lang} className={styles.navLink} key={i}>
                                    <span className={styles.navLinkCaption}>{localizeString(link.title, lang)}</span>
                                </LinkWrapper>
                            );
                        }
                        return null;
                    })}
                </nav>
            )}
            <div className={styles.wrapper}>
                {/* LOGO */}
                {logoUrl && (
                    // UPLOADED
                    <img src={logoUrl} className={styles.logoImage} alt={globalConfig.organization} />
                )}
                <div className={styles.contactsWrapper}>
                    {/* CONTACTS */}
                    <PortableText data={contacts} parent="field" lang={lang} className={styles.contacts} />
                    {/* SOCIAL */}
                    {social && social.length > 0 && (
                        <div className={styles.social}>
                            {social.map((link, i) => (
                                <LinkContact link={link} lang={lang} className={styles.socialLink} key={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}
