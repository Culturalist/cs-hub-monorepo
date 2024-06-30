"use client";
import { ResponsiveContainer, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { ContentType, Formatter } from "recharts/types/component/DefaultLegendContent";
import { ChartComponent, ChartOrientation, Swatches } from "@cs/data/schemas";
import { pickSwatch, type ChartData } from "./Chart.logic";
import { pieChartValues } from "./Chart.values";

interface ChartPieProps {
    data: ChartData[];
    params: string[];
    orientation: ChartOrientation;
    components?: ChartComponent[];
    swatches?: Swatches;
}

export default function ChartPie(props: ChartPieProps) {
    const { data, params, swatches } = props;

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

    const components = (
        <>
            {props.components?.includes("grid") && <CartesianGrid strokeDasharray="3 3" />}
            {props.components?.includes("tooltip") && (
                <Tooltip separator=": " cursor={{ fill: pickSwatch(swatches, 0), opacity: 0.1 }} />
            )}
            {props.components?.includes("legend") && <Legend formatter={renderChartLegend} />}
        </>
    );

    return (
        <ResponsiveContainer width="100%" height={500}>
            <PieChart width={500} height={300}>
                {/* COMPONENTS */}
                {components}
                {data.map((param, i) => {
                    const pieData = Object.entries(param)
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
                            // fill={pickSwatch(swatches, i)}
                            label={i === data.length - 1}
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
