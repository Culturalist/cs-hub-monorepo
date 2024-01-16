export type ChartDesign = "bar" | "stacked" | "line" | "area" | "pie";

export const chartDesignList = [
    { title: "Bar", value: "bar" },
    { title: "Line", value: "line" },
    { title: "Stacked bar", value: "stacked" },
    { title: "Area", value: "area" },
    { title: "Pie", value: "pie" }
];
export const chartDesignInitialValue = "bar";

export type ChartOrientation = "horizontal" | "vertical";

export const chartOrientationList = [
    { title: "Horizontal", value: "horizontal" },
    { title: "Vertical", value: "vertical" }
];
export const chartOrientationInitialValue = "horizontal";

export type ChartComponent = "axis" | "tooltip" | "label" | "legend" | "grid";

export const chartComponentsList = [
    { title: "Axis", value: "axis" },
    { title: "Legend", value: "legend" },
    { title: "Label", value: "label" },
    { title: "Tooltip", value: "tooltip" },
    { title: "Grid", value: "grid" }
];
export const chartComponentsInitialValue = ["axis", "legend", "label"];
