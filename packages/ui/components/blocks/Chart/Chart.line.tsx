"use client";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { ChartComponent, ChartOrientation, Swatches } from "@cs/data/schemas";
import { pickSwatch, type ChartData, LabelsData } from "./Chart.logic";
import ChartLabel from "./Chart.label";
import ChartComponents from "./Chart.components";

interface ChartLineProps {
    data: ChartData[];
    params: string[];
    labels: LabelsData[];
    orientation: ChartOrientation;
    components?: ChartComponent[];
    swatches?: Swatches;
}

export default function ChartLine(props: ChartLineProps) {
    const { data, params, labels, orientation, components, swatches } = props;

    return (
        <ResponsiveContainer width="100%" height={500}>
            <LineChart width={500} height={300} data={data} layout={orientation}>
                {/* COMPONENTS */}
                {ChartComponents({ design: "line", orientation, components, swatches })}
                {params.map((param, i) => (
                    <Line
                        type="monotone"
                        dataKey={param}
                        stroke={pickSwatch(swatches, i)}
                        label={(labelProps) => (
                            <ChartLabel
                                design="line"
                                param={param}
                                labels={labels}
                                orientation={orientation}
                                hide={!props.components?.includes("label")}
                                {...labelProps}
                            />
                        )}
                        key={i}
                    />
                ))}
            </LineChart>
        </ResponsiveContainer>
    );
}
