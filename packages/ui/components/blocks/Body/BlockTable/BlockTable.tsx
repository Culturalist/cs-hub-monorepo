import { BlockTable } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { createStyles } from "./BlockTable.styles";
import { localizeString, selectLocale } from "@cs/data";
import { PortableText } from "../../PortableText";

interface BlockTableProps extends DefaultProps {
    data?: BlockTable;
}

export default function BlockTable(props: BlockTableProps) {
    const { data, lang, className } = props;
    if (!data) return null;
    const { headers, description } = data;
    const title = localizeString(data.title, lang);
    const subtitle = localizeString(data.subtitle, lang);
    const tableData = selectLocale(data.data, lang);
    const topHeader = headers?.includes("top") && tableData?.rows[0] ? tableData.rows[0] : undefined;
    const rows = headers?.includes("top") ? tableData?.rows.slice(1) : tableData?.rows;

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {title ? (
                <h3 className={styles.titleWrapper}>
                    <span className={styles.title}>{title}</span>
                </h3>
            ) : null}
            {subtitle ? (
                <p className={styles.subtitleWrapper}>
                    <span className={styles.subtitle}>{subtitle}</span>
                </p>
            ) : null}
            {tableData ? (
                <table className={styles.table}>
                    {topHeader ? (
                        <thead className={styles.topHeader}>
                            <tr className={styles.row}>
                                {topHeader.cells.map((cell, i) => (
                                    <th key={i} className={styles.cellWrapper}>
                                        <span className={styles.cell}>{cell}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    ) : null}
                    {rows ? (
                        <tbody className={styles.body}>
                            {rows.map(({ cells }, i) => (
                                <tr key={i} className={styles.row}>
                                    {cells.map((cell, j) => (
                                        <th key={j} className={styles.cellWrapper}>
                                            <span className={styles.cell}>{cell}</span>
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    ) : null}
                </table>
            ) : null}
            <PortableText parent="field" data={description} lang={lang} className={styles.description} />
        </div>
    );
}
