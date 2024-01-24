import { Report } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { localizeString } from "@cs/data/utils";
import { Body, Cover, PageIndex } from "../../blocks";
import { createStyles } from "./ReportLayout.styles";
import { SetPalette } from "@weresk/maket";
import { hasLongWords } from "../../../utils";

interface ReportLayoutProps extends DefaultProps {
    data: Report;
}

export default function ReportLayout(props: ReportLayoutProps) {
    const { data, lang, className } = props;
    const { covers, captionAlt, index, body, palette } = data;
    const title = localizeString(data.title, lang);
    const styles = createStyles({ className });

    return (
        <>
            <main className={styles.container}>
                <h1 data-hyphen={hasLongWords(title)} className={styles.titleWrapper}>
                    <span className={styles.title}>{title}</span>
                </h1>
                {/* INDEX */}
                {index && <PageIndex body={body} lang={lang} className={styles.index} />}
                {/* COVER */}
                <Cover
                    array={covers}
                    parent="page"
                    caption={captionAlt?.caption}
                    alt={captionAlt?.alt}
                    lang={lang}
                    className={styles.cover}
                />
                {/* BODY */}
                <Body data={body} lang={lang} className={styles.body} />
            </main>
            <SetPalette selector="body" set={palette}>
                {palette?.on_surface
                    ? `header { --header-logo-lightness: ${palette.on_surface.hsl.l} } footer { --footer-logo-lightness: ${palette.on_surface_light.hsl.l} }`
                    : undefined}
            </SetPalette>
        </>
    );
}
