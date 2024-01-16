import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Rectangle
} from "recharts";
import { ImplicitLabelType } from "recharts/types/component/Label";
import { ChartComponent, ChartDesign, ChartOrientation } from "@cs/data/schemas";
import { ChartData } from "./BlockChart.logic";
import { ContentType, Formatter } from "recharts/types/component/DefaultLegendContent";

interface ChartProps {
    data: ChartData[];
    params: string[];
    design: ChartDesign;
    orientation: ChartOrientation;
    axis: boolean;
    components?: ChartComponent[];
}

export default function Chart(props: ChartProps) {
    const { data, params, design, orientation } = props;
    const hideAxis = !props.components?.includes("axis");

    const axis = (
        <>
            {orientation === "horizontal" ? (
                <XAxis type="category" dataKey="value" hide={hideAxis} />
            ) : (
                <XAxis type="number" hide={hideAxis} />
            )}
            {orientation === "horizontal" ? (
                <YAxis type="number" hide={hideAxis} />
            ) : (
                <YAxis type="category" dataKey="value" hide={hideAxis} />
            )}
        </>
    );
    const pieChartValues = {
        minRadius: 15,
        maxRadius: 200,
        gap: 15,
        step: 30
    };
    const startRadius = Math.max(
        pieChartValues.minRadius,
        pieChartValues.maxRadius - (data.length - 1) * pieChartValues.gap - data.length * pieChartValues.step
    );

    const renderChartLegend: Formatter = (value, entry) => {
        const { color, payload } = entry;
        const param = payload && "param" in payload ? (payload.param as string) : null;

        return <span>{`${param} / ${value}`}</span>;
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
            {props.components?.includes("tooltip") && <Tooltip />}
            {props.components?.includes("legend") && (
                <Legend formatter={design === "pie" ? renderChartLegend : undefined} />
            )}
            {props.components?.includes("grid") && <CartesianGrid strokeDasharray="3 3" />}
        </>
    );

    const label: ImplicitLabelType | undefined =
        props.components?.includes("label") &&
        (orientation === "horizontal" ? { position: "top" } : { position: "right" });

    // BAR CHART
    if (design === "bar")
        return (
            <ResponsiveContainer width="100%" height={500}>
                <BarChart width={500} height={300} data={data} layout={orientation}>
                    {/* AXIS */}
                    {axis}
                    {/* COMPONENTS */}
                    {components}
                    {params.map((param, i) => (
                        <Bar dataKey={param} fill="#8884d8" label={label} key={i} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        );
    // STACKED BAR CHART
    else if (design === "stacked")
        return (
            <ResponsiveContainer width="100%" height={500}>
                <BarChart width={500} height={300} data={data} layout={orientation}>
                    {/* AXIS */}
                    {axis}
                    {/* COMPONENTS */}
                    {components}
                    {params.map((param, i) => (
                        <Bar dataKey={param} stackId="1" fill="#8884d8" label={label} key={i} />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        );
    // LINE CHART
    else if (design === "line")
        return (
            <ResponsiveContainer width="100%" height={500}>
                <LineChart width={500} height={300} data={data} layout={orientation}>
                    {/* AXIS */}
                    {axis}
                    {/* COMPONENTS */}
                    {components}
                    {params.map((param, i) => (
                        <Line type="monotone" dataKey={param} stroke="#8884d8" label={label} key={i} />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        );
    // AREA CHART
    else if (design === "area")
        return (
            <ResponsiveContainer width="100%" height={500}>
                <AreaChart width={500} height={300} data={data} layout={orientation}>
                    {/* AXIS */}
                    {axis}
                    {/* COMPONENTS */}
                    {components}
                    {params.map((param, i) => (
                        <Area
                            type="monotone"
                            dataKey={param}
                            stackId="1"
                            stroke="#8884d8"
                            fill="#8884FF"
                            label={label}
                            key={i}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        );
    // PIE CHART
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
                            fill="#8884d8"
                            label={i === data.length - 1}
                            key={i}
                        />
                    );
                })}
            </PieChart>
        </ResponsiveContainer>
    );
}
