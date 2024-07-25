import { ChartDesign, ChartOrientation } from "@cs/data";
import { LabelsData } from "./Chart.logic";

interface ChartLabelProps {
    param: string;
    name: string;
    index: number;
    labels: LabelsData[];
    orientation: ChartOrientation;
    design: ChartDesign;
    fill: string;
    x: number;
    y: number;
    cx: number;
    cy: number;
    width: number;
    height: number;
    innerRadius?: number;
    outerRadius?: number;
    midAngle?: number;
    hide?: boolean;
    hideExternal?: boolean;
}

export default function ChartLabel(props: ChartLabelProps) {
    const {
        param,
        name,
        index,
        labels,
        orientation,
        design,
        x,
        y,
        cx,
        cy,
        fill,
        width = 0,
        height = 0,
        midAngle = 0,
        innerRadius = 0,
        outerRadius = 0,
        hide,
        hideExternal
    } = props;

    if (hide) return undefined;
    const value = labels[index][param];
    const external = design === "pie" ? name : value;
    const internal = value;

    const RADIAN = Math.PI / 180;
    const gap = 8;
    let color = fill || "#666";
    let anchor = orientation === "horizontal" ? "middle" : "start";
    let baseline = orientation === "horizontal" ? "end" : "central";
    let ex = orientation === "horizontal" ? x + width / 2 : x + width + gap;
    let ey = orientation === "horizontal" ? y - gap : y + height / 2;

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const rx = cx + radius * Math.cos(-midAngle * RADIAN);
    const ry = cy + radius * Math.sin(-midAngle * RADIAN);

    if (design === "stacked") {
        color = orientation === "vertical" ? "#FFF" : "#666";
        anchor = orientation === "vertical" ? "middle" : "start";
        baseline = "central";
        ex = orientation === "vertical" ? x + width / 2 : x + width + gap;
        ey = y + height / 2;
    } else if (design === "pie") {
        anchor = midAngle < -90 || midAngle > 90 ? "end" : "start";
        baseline = "central";
        ex = x + width / 2 + gap * Math.cos(-midAngle * RADIAN);
        ey = y + height / 2 + gap * Math.sin(-midAngle * RADIAN);
    }

    return (
        <>
            {!hideExternal ? (
                <text x={ex} y={ey} textAnchor={anchor} fill={color} dominantBaseline={baseline}>
                    {external}
                </text>
            ) : null}
            {design === "pie" ? (
                <text x={rx} y={ry} textAnchor={"middle"} fill={"#FFF"} dominantBaseline={"central"}>
                    {internal}
                </text>
            ) : null}
        </>
    );
}
