import { wrapReference, localizeString } from "@cs/data/utils";
import { Header, LocaleString } from "@cs/data/schemas";
import { globalConfig, DefaultProps, Locale, appsConfig } from "@cs/globals";
import { createStyles, Styles } from "./Header.styles";
import { getImageUrl } from "@cs/globals/lib/sanity";
import { LinkWrapper, Menu } from "../../blocks";

interface HeaderProps extends DefaultProps {
    data?: Header;
    languages?: string[];
    title?: LocaleString;
}

export default function Header(props: HeaderProps) {
    const { data, languages, lang, className } = props;
    if (!data) return null;

    const { marker, links } = data;
    const logoUrl = data.logo && getImageUrl(data.logo);
    const title = localizeString(props.title, lang);
    const markerCaption = marker && localizeString(marker.caption, lang);
    const styles: Styles = createStyles({ className });

    return (
        <header className={styles.container}>
            <div className={styles.wrapper}>
                {/* LOGO */}
                {logoUrl ? (
                    // UPLOADED
                    <LinkWrapper href="/" lang={lang} className={styles.logo}>
                        <img src={logoUrl} className={styles.logoImage} alt={title} />
                    </LinkWrapper>
                ) : (
                    // DEFAULT WITH TITLE
                    <div className={styles.defaultLogo}>
                        <LinkWrapper href={appsConfig.culturas.domain || "/"} lang={lang}>
                            <img
                                src="/assets/cs-logo-min.svg"
                                className={styles.logoImage}
                                alt={globalConfig.organization}
                            />
                        </LinkWrapper>
                        <LinkWrapper href="/" lang={lang}>
                            <div>
                                <span className={styles.title}>{title}</span>
                            </div>
                        </LinkWrapper>
                    </div>
                )}
                {markerCaption && (
                    <>
                        {/* LINE */}
                        <hr className={styles.line} />
                        {/* MARKER */}
                        <LinkWrapper link={marker.link} lang={lang} className={styles.markerWrapper}>
                            <span className={styles.marker}>{markerCaption}</span>
                        </LinkWrapper>
                    </>
                )}
            </div>
            {links && links.length > 0 && (
                <Menu links={links} marker={marker} languages={languages} lang={lang} className={styles.menu} />
            )}
            {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
        </header>
    );
}
