import { ChartDesign, Swatches, defaultSwatches } from "@cs/data/schemas";
import { TableValue, numeric } from "@weresk/core";

export type ChartData = { value: string } & (Record<string, number> | object);

export function prepareChartData(data: TableValue | undefined, design: ChartDesign, swap?: boolean): ChartData[] {
    const output: ChartData[] = [];
    const params = getChartParams(data, swap);
    const values = getChartValues(data, swap);
    values.forEach((value, v) => {
        const item: Record<string, number> = {};
        params.forEach((param, p) => {
            item[param] = numeric(data?.rows[(swap ? v : p) + 1]?.cells[(swap ? p : v) + 1]);
        });
        output.push({
            value,
            ...item
        });
    });

    return output;
}

export function getChartParams(data: TableValue | undefined, swap?: boolean): string[] {
    return swap ? data?.rows[0]?.cells.slice(1) ?? [] : data?.rows.slice(1)?.map((row) => row.cells[0]) ?? [];
}

export function getChartValues(data: TableValue | undefined, swap?: boolean): string[] {
    return !swap ? data?.rows[0]?.cells.slice(1) ?? [] : data?.rows.slice(1)?.map((row) => row.cells[0]) ?? [];
}

export function pickSwatch(swatches: Swatches | undefined, index: number): string {
    const defaultColor = "#60a5fa";
    const colors = swatches?.swatches?.length ? swatches.swatches.map((s) => s.color?.hex) : [];
    const color = colors.length ? colors[index % colors.length] : defaultSwatches[index % defaultSwatches.length];
    return color || defaultColor;
}
