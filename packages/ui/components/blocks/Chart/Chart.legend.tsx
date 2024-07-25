interface ChartLegendProps {
    payload?: any;
}

export default function ChartLegend(props: ChartLegendProps) {
    const { payload } = props;
    console.log(props);

    return <div>Legend</div>;
}
