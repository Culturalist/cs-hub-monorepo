"use client";
import { ResponsiveContainer, BarChart, Bar } from "recharts";
import { ChartComponent, ChartOrientation, Swatches } from "@cs/data/schemas";
import { pickSwatch, type ChartData, LabelsData } from "./Chart.logic";
import { barChartValues } from "./Chart.values";
import ChartLabel from "./Chart.label";
import ChartComponents from "./Chart.components";
import ChartLegend from "./Chart.legend";
import { LinkWrapper } from "../LinkWrapper";

interface ChartBarProps {
    data: ChartData[];
    params: string[];
    labels: LabelsData[];
    orientation: ChartOrientation;
    components?: ChartComponent[];
    swatches?: Swatches;
}

export default function ChartBar(props: ChartBarProps) {
    const { data, params, labels, orientation, components, swatches } = props;

    return (
        <>
            <ResponsiveContainer width="100%" height={500}>
                <BarChart width={500} height={300} data={data} layout={orientation}>
                    {/* COMPONENTS */}
                    {ChartComponents({ design: "bar", orientation, components, swatches })}

                    {/* CHART */}
                    {params.map((param, i) => (
                        <Bar
                            dataKey={param}
                            fill={pickSwatch(swatches, i)}
                            barSize={barChartValues.size}
                            label={(labelProps) => (
                                <ChartLabel
                                    design="bar"
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
                </BarChart>
            </ResponsiveContainer>
        </>
    );
}
