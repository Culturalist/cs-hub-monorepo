import { BlockTable } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { createStyles } from "./BlockTable.styles";
import { localizeString, selectLocale } from "@cs/data";
import { PortableText } from "../../PortableText";
import { Table } from "../../Table";

interface BlockTableProps extends DefaultProps {
    data?: BlockTable;
}

export default function BlockTable(props: BlockTableProps) {
    const { data, lang, className } = props;
    if (!data) return null;
    const { swap, headers, description, swatches } = data;
    const title = localizeString(data.title, lang);
    const subtitle = localizeString(data.subtitle, lang);
    const tableData = selectLocale(data.data, lang);

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {/* TITLE */}
            {title ? (
                <h3 className={styles.titleWrapper}>
                    <span className={styles.title}>{title}</span>
                </h3>
            ) : null}
            {/* SUBTITLE */}
            {subtitle ? (
                <p className={styles.subtitleWrapper}>
                    <span className={styles.subtitle}>{subtitle}</span>
                </p>
            ) : null}
            {/* TABLE */}
            <Table
                data={tableData}
                swap={swap}
                headers={headers}
                swatches={swatches}
                lang={lang}
                className={styles.table}
            />
            {/* DESCRIPTION */}
            <PortableText parent="field" data={description} lang={lang} className={styles.description} />
        </div>
    );
}
