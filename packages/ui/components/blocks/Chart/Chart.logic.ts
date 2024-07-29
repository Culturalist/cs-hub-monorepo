import { ChartDesign, Swatches, defaultSwatches } from "@cs/data/schemas";
import { TableValue, numeric } from "@weresk/core";
import { flipTable } from "../Table";

export type ChartData = { value: string } & (Record<string, number> | object);
export type LabelsData = { value: string } & Record<string, string>;

export function prepareChartData(
    data?: TableValue,
    design?: ChartDesign,
    swap?: boolean
): [ChartData[], LabelsData[], string[]] {
    if (!data) return [[], [], []];
    const chart: ChartData[] = [];
    const labels: LabelsData[] = [];
    const _swap = design === "pie" ? swap : !swap;
    const input = _swap ? flipTable(data) : data;
    const params = getTopHeaderValues(input);
    const values = getLeftHeaderValues(input);
    values.forEach((value, v) => {
        const chartItem: Record<string, number> = {};
        const labelItem: Record<string, string> = {};
        params.forEach((param, p) => {
            const cell = input.rows[p + 1]?.cells[v + 1];
            labelItem[param] = cell || "";
            chartItem[param] = numeric(cell);
        });
        chart.push({
            value,
            ...chartItem
        });
        labels.push({
            value,
            ...labelItem
        });
    });

    return [chart, labels, design === "pie" ? values : params];
}

export function getLeftHeaderValues(data: TableValue | undefined): string[] {
    return data?.rows[0]?.cells.slice(1) || [];
}

export function getTopHeaderValues(data: TableValue | undefined): string[] {
    return data?.rows.slice(1)?.map((row) => row.cells[0]) || [];
}

export function pickSwatch(swatches: Swatches | undefined, index: number): string {
    const defaultColor = "#60a5fa";
    const colors = swatches?.swatches?.length ? swatches.swatches.map((s) => s.color?.hex) : [];
    const color = colors.length ? colors[index % colors.length] : defaultSwatches[index % defaultSwatches.length];
    return color || defaultColor;
}
