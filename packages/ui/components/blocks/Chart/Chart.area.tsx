"use client";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area } from "recharts";
import { ImplicitLabelType } from "recharts/types/component/Label";
import { ChartComponent, ChartOrientation, Swatches } from "@cs/data/schemas";
import { pickSwatch, type ChartData } from "./Chart.logic";
import { barChartValues } from "./Chart.values";

interface ChartAreaProps {
    data: ChartData[];
    params: string[];
    orientation: ChartOrientation;
    components?: ChartComponent[];
    swatches?: Swatches;
}

export default function ChartArea(props: ChartAreaProps) {
    const { data, params, orientation, swatches } = props;

    const hideAxis = !props.components?.includes("axis");
    const axis = (
        <>
            {orientation === "horizontal" ? (
                <XAxis type="category" dataKey="value" hide={hideAxis} />
            ) : (
                <XAxis type="number" hide={hideAxis} padding={{ right: barChartValues.size }} />
            )}
            {orientation === "horizontal" ? (
                <YAxis type="number" hide={hideAxis} padding={{ top: barChartValues.size }} />
            ) : (
                <YAxis type="category" dataKey="value" hide={hideAxis} />
            )}
        </>
    );

    const components = (
        <>
            {props.components?.includes("grid") && <CartesianGrid strokeDasharray="3 3" />}
            {props.components?.includes("tooltip") && (
                <Tooltip separator=": " cursor={{ fill: pickSwatch(swatches, 0), opacity: 0.1 }} />
            )}
            {props.components?.includes("legend") && <Legend />}
        </>
    );

    const label: ImplicitLabelType | undefined =
        props.components?.includes("label") &&
        (orientation === "horizontal" ? { position: "top" } : { position: "right" });

    return (
        <ResponsiveContainer width="100%" height={500}>
            <AreaChart width={500} height={300} data={data} layout={orientation}>
                {/* COMPONENTS */}
                {components}
                {/* AXIS */}
                {axis}
                {/* CHART */}
                {params.map((param, i) => (
                    <Area
                        type="monotone"
                        dataKey={param}
                        stackId="1"
                        stroke={pickSwatch(swatches, i)}
                        fill={pickSwatch(swatches, i)}
                        label={label}
                        key={i}
                    />
                ))}
            </AreaChart>
        </ResponsiveContainer>
    );
}
