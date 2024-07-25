"use client";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ContentType, Formatter } from "recharts/types/component/DefaultLegendContent";
import { ChartComponent, Swatches } from "@cs/data/schemas";
import { pickSwatch, type ChartData, LabelsData } from "./Chart.logic";
import { pieChartValues } from "./Chart.values";
import ChartLabel from "./Chart.label";
import ChartComponents from "./Chart.components";
import ChartLegend from "./Chart.legend";

interface ChartPieProps {
    data: ChartData[];
    params: string[];
    labels: LabelsData[];
    components?: ChartComponent[];
    swatches?: Swatches;
}

export default function ChartPie(props: ChartPieProps) {
    const { data, params, components, labels, swatches } = props;

    const startRadius = Math.max(
        pieChartValues.minRadius,
        pieChartValues.maxRadius - (data.length - 1) * pieChartValues.gap - data.length * pieChartValues.step
    );

    const renderChartLegend: Formatter = (value, entry) => {
        const { color, payload } = entry;
        const param = payload && "param" in payload ? (payload.param as string) : null;

        return <span>{`${param}: ${value}`}</span>;
    };

    const fullRenderChartLegend: ContentType = (renderProps) => {
        const { payload } = renderProps;
        if (!payload) return null;
        return (
            <ul>
                {payload.map((entry, index) => (
                    <li key={`item-${index}`}>{entry.value}</li>
                ))}
            </ul>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={500}>
            <PieChart width={500} height={300}>
                {/* COMPONENTS */}
                {ChartComponents({ design: "pie", components, swatches, params })}
                {/* LEGEND */}
                {/* {ChartLegend({})} */}
                {/* CHART */}
                {data.map((param, i) => {
                    const pieData = Object.entries(param)
                        .map(([name, value]) => ({ name, value, param: param.value }))
                        .filter((item) => item.name !== "value");
                    const labelsData = Object.entries(labels[i])
                        .map(([name, value]) => ({ name, value, param: param.value }))
                        .filter((item) => item.name !== "value");

                    return (
                        <Pie
                            data={pieData}
                            nameKey="name"
                            dataKey="value"
                            cx="50%"
                            cy="50%"
                            innerRadius={startRadius + i * (pieChartValues.gap + pieChartValues.step)}
                            outerRadius={startRadius + i * pieChartValues.gap + (i + 1) * pieChartValues.step}
                            startAngle={-180}
                            endAngle={180}
                            // fill={pickSwatch(swatches, i)}
                            label={(labelProps) => (
                                <ChartLabel
                                    {...labelProps}
                                    design="pie"
                                    param={"value"}
                                    hide={!props.components?.includes("label")}
                                    hideExternal={i !== data.length - 1}
                                    labels={labelsData}
                                />
                            )}
                            labelLine={props.components?.includes("label") && i === data.length - 1}
                            key={i}
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={pickSwatch(swatches, index)} />
                            ))}
                        </Pie>
                    );
                })}
            </PieChart>
        </ResponsiveContainer>
    );
}
