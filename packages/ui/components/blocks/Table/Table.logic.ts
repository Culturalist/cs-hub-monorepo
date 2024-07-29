import { Swatches, TableHeaderOption, defaultSwatches } from "@cs/data";
import { TableValue, numeric } from "@weresk/core";

export type TableOperation = "HIGHLIGHT";

export interface FormattedTableCell {
    value: string;
    highlight?: string;
}

export interface FormattedTableColumn {
    highlight?: string;
    header?: boolean;
}

export interface FormattedTableRow {
    cells: FormattedTableCell[];
    columns?: (FormattedTableColumn | null)[];
    highlight?: string;
    header?: boolean;
}

export interface OperationValue {
    value: string;
    operation?: TableOperation;
    id?: string;
}

// TABLE COMMANDS
export const tableCommands: Record<TableOperation, RegExp> = {
    HIGHLIGHT: /\/!(\d*)$/g // /! or /![number]
};

export function prepareTable(
    data: TableValue,
    headers?: TableHeaderOption[],
    swap?: boolean,
    swatches?: Swatches
): FormattedTableRow[] {
    const input = swap ? flipTable(data) : data;
    const output: FormattedTableRow[] = [];
    const topHeader = headers?.includes("top");
    const leftHeader = headers?.includes("left");
    const colors = swatches?.swatches?.length
        ? swatches.swatches.map((s) => s.color?.hex || "#FFFFFF")
        : defaultSwatches;

    input.rows.forEach((row, i) => {
        const formattedRow: FormattedTableRow = {
            cells: [],
            header: topHeader && i === 0,
            columns: []
        };
        row.cells.forEach((cell, j) => {
            const formattedCell: FormattedTableCell = {
                value: cell
            };
            const formattedColumn: FormattedTableColumn = {
                header: leftHeader && j === 0
            };
            const operationValue = matchCommand(cell);
            // HIGHLIGHT OPERATION
            if (operationValue.operation === "HIGHLIGHT") {
                const colorIndex = numeric(operationValue.id) ? numeric(operationValue.id) - 1 : 0;
                const highlight = colors[colorIndex % colors.length];
                if (i === 0 && topHeader) {
                    // Highlight column if command in top header
                    formattedColumn.highlight = highlight;
                } else if (j === 0 && leftHeader) {
                    // Highlight row if command in left header
                    formattedRow.highlight = highlight;
                } else {
                    // Otherwise highlight cell
                    formattedCell.highlight = highlight;
                }
                formattedCell.value = cell.replace(tableCommands[operationValue.operation], "");
            }
            formattedRow.cells.push(formattedCell);
            formattedRow.columns?.push(formattedColumn);
        });
        output.push(formattedRow);
    });

    return output;
}

export function matchCommand(value: string): OperationValue {
    let operation: TableOperation | undefined;
    let id = "";

    Object.entries(tableCommands).some(([op, pattern]) => {
        const match = pattern.exec(value);
        if (match) {
            operation = op as TableOperation;
            id = match[1];
        }
        return Boolean(id);
    });

    return {
        value,
        operation,
        id
    };
}

export function highlightToBgColor(highlight?: string, opacity = 1): string | undefined {
    return highlight ? `${highlight}${Math.floor(opacity * 255).toString(16)}` : undefined;
}

export function flipTable(data: TableValue): TableValue {
    const output: TableValue = {
        _type: "table",
        rows: new Array(data.rows[0].cells.length).fill({
            cells: new Array(data.rows.length),
            _type: "row",
            _key: ""
        })
    };

    data.rows.forEach((row, i) => {
        row.cells.forEach((cell, j) => {
            const newCells = [...output.rows[j].cells];
            newCells[i] = cell;
            output.rows[j] = {
                ...output.rows[j],
                cells: newCells
            };
        });
    });
    return output;
}
