import { TableValue } from "@weresk/core";
import { Swatches, TableHeaderOption } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { createStyles } from "./Table.styles";
import { highlightToBgColor, prepareTable } from "./Table.logic";

interface TableProps extends DefaultProps {
    data?: TableValue;
    headers?: TableHeaderOption[];
    swatches?: Swatches;
    swap?: boolean;
}

export default function Table(props: TableProps) {
    const { data, headers, swatches, swap, className } = props;
    if (!data) return null;
    const tableData = prepareTable(data, headers, swap, swatches);
    const topHeader = headers?.includes("top") && tableData[0] ? tableData[0] : undefined;
    const rows = headers?.includes("top") ? tableData.slice(1) : tableData;

    const styles = createStyles({ className });
    const highlightOpacity = 0.25;
    const headerOpacity = 0.15;
    const headerBg = "#999999";

    return (
        <table className={styles.container}>
            {topHeader ? (
                <thead className={styles.topHeader}>
                    <tr className={styles.row}>
                        {topHeader.cells.map((cell, i) => {
                            const bg =
                                topHeader.columns?.[i]?.highlight ||
                                (topHeader.columns?.[i]?.header ? headerBg : undefined);
                            const opacity = topHeader.columns?.[i]?.highlight ? highlightOpacity : headerOpacity;
                            return (
                                <th
                                    className={styles.cellWrapper}
                                    style={{
                                        backgroundColor: highlightToBgColor(bg, opacity)
                                    }}
                                    key={i}
                                >
                                    <span className={styles.cell}>{cell.value}</span>
                                </th>
                            );
                        })}
                    </tr>
                </thead>
            ) : null}
            <tbody className={styles.body}>
                {rows.map((row, i) => (
                    <tr
                        className={styles.row}
                        style={{
                            backgroundColor: highlightToBgColor(row.highlight, highlightOpacity)
                        }}
                        key={i}
                    >
                        {row.cells.map((cell, j) => {
                            const bg =
                                cell.highlight ||
                                topHeader?.columns?.[j]?.highlight ||
                                row.columns?.[j]?.highlight ||
                                (row.columns?.[j]?.header ? headerBg : undefined);
                            const opacity =
                                cell.highlight || row.columns?.[j]?.highlight ? highlightOpacity : headerOpacity;
                            return (
                                <th
                                    className={styles.cellWrapper}
                                    style={{
                                        backgroundColor: highlightToBgColor(bg, opacity)
                                    }}
                                    key={j}
                                >
                                    <span className={styles.cell}>{cell.value}</span>
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
