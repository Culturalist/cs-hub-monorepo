"use client";
import { ResponsiveContainer } from "recharts";
import { BlockChart } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { localizeString, selectLocale } from "@cs/data";
import { createStyles } from "./BlockChart.styles";
import { getChartParams, prepareChartData } from "./BlockChart.logic";
import Chart from "./BlockChart.chart";

interface BlockChartProps extends DefaultProps {
    data?: BlockChart;
}

export default function BlockChart(props: BlockChartProps) {
    const { data, lang, className } = props;
    if (!data) return null;
    const { design, orientation, components } = data;
    let swap = orientation === "horizontal" ? data.swap : !data.swap;
    if (design === "pie") swap = !swap;
    const title = localizeString(data.title, lang);
    const tableData = selectLocale(data.data, lang);
    const chartData = prepareChartData(tableData, design, swap);
    const chartParams = getChartParams(tableData, swap);

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {title ? (
                <h3 className={styles.titleWrapper}>
                    <span className={styles.title}>{title}</span>
                </h3>
            ) : null}
            {chartData.length ? (
                <div className={styles.chart}>
                    <Chart
                        data={chartData}
                        params={chartParams}
                        design={design}
                        orientation={orientation}
                        axis={true}
                        components={components}
                    />
                </div>
            ) : null}
        </div>
    );
}
