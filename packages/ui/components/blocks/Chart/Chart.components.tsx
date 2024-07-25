import { XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { ChartComponent, ChartDesign, ChartOrientation, Swatches } from "@cs/data";
import { pickSwatch } from "./Chart.logic";
import { barChartValues } from "./Chart.values";
import { Payload } from "recharts/types/component/DefaultLegendContent";

interface ChartComponentsProps {
    design: ChartDesign;
    orientation?: ChartOrientation;
    components?: ChartComponent[];
    swatches?: Swatches;
    params?: string[];
}

export default function ChartComponents(props: ChartComponentsProps) {
    const { design, orientation, components, swatches, params } = props;
    const hideAxis = !components?.includes("axis");

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

    const legendPayload: Payload[] | undefined =
        design === "pie"
            ? params?.map((param, i) => ({
                  value: param,
                  color: "#666",
                  legendIcon: (
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          strokeWidth={Math.min(12 / params.length, 6)}
                          stroke="currentColor"
                      >
                          <circle cx="12" cy="12" r={(i + 1) * (6 / params.length)} />
                      </svg>
                  )
              }))
            : undefined;

    return (
        <>
            {/* LEGEND */}
            {components?.includes("legend") && <Legend payload={legendPayload} />}
            {/* GRID */}
            {components?.includes("grid") && <CartesianGrid strokeDasharray="3 3" />}
            {/* TOOLTIP */}
            {components?.includes("tooltip") && (
                <Tooltip separator=": " cursor={{ fill: pickSwatch(swatches, 0), opacity: 0.1 }} />
            )}
            {/* AXIS */}
            {design !== "pie" ? axis : null}
        </>
    );
}
