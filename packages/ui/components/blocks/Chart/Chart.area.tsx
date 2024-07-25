"use client";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { ChartComponent, ChartOrientation, Swatches } from "@cs/data/schemas";
import { pickSwatch, type ChartData, LabelsData } from "./Chart.logic";
import ChartLabel from "./Chart.label";
import ChartComponents from "./Chart.components";

interface ChartAreaProps {
    data: ChartData[];
    params: string[];
    labels: LabelsData[];
    orientation: ChartOrientation;
    components?: ChartComponent[];
    swatches?: Swatches;
}

export default function ChartArea(props: ChartAreaProps) {
    const { data, params, labels, components, orientation, swatches } = props;

    return (
        <ResponsiveContainer width="100%" height={500}>
            <AreaChart width={500} height={300} data={data} layout={orientation}>
                {/* COMPONENTS */}
                {ChartComponents({ design: "area", orientation, components, swatches })}
                {/* CHART */}
                {params.map((param, i) => (
                    <Area
                        type="monotone"
                        dataKey={param}
                        stackId="1"
                        stroke={pickSwatch(swatches, i)}
                        fill={pickSwatch(swatches, i)}
                        label={(labelProps: any) => (
                            <ChartLabel
                                design="area"
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
            </AreaChart>
        </ResponsiveContainer>
    );
}
