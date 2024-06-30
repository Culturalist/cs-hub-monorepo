import { BlockChart } from "@cs/data/schemas";
import { getChartParams, prepareChartData } from "./Chart.logic";
import { DefaultProps } from "@weresk/core";
import { selectLocale } from "@cs/data";
import ChartBar from "./Chart.bar";
import ChartStacked from "./Chart.stacked";
import ChartLine from "./Chart.line";
import ChartArea from "./Chart.area";
import ChartPie from "./Chart.pie";

interface ChartProps extends DefaultProps {
    data?: BlockChart;
}

export default function Chart(props: ChartProps) {
    const { data, lang } = props;
    if (!data) return null;
    const { design, orientation, components, swatches } = data;

    let swap = orientation === "horizontal" ? data.swap : !data.swap;
    if (design === "pie") swap = !swap;

    const tableData = selectLocale(data.data, lang);
    const chartParams = getChartParams(tableData, swap);
    const chartData = prepareChartData(tableData, design, swap);
    if (!chartData.length) return null;

    const chartProps = {
        data: chartData,
        params: chartParams,
        components,
        orientation,
        swatches
    };

    if (design === "bar") return <ChartBar {...chartProps} />;
    else if (design === "stacked") return <ChartStacked {...chartProps} />;
    else if (design === "line") return <ChartLine {...chartProps} />;
    else if (design === "area") return <ChartArea {...chartProps} />;
    return <ChartPie {...chartProps} />;
}
