import { BlockChart } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { localizeString } from "@cs/data";
import { createStyles } from "./BlockChart.styles";
import { Chart } from "../../Chart";

interface BlockChartProps extends DefaultProps {
    data?: BlockChart;
}

export default function BlockChart(props: BlockChartProps) {
    const { data, lang, className } = props;
    if (!data) return null;
    const title = localizeString(data.title, lang);
    const subtitle = localizeString(data.subtitle, lang);

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            {title ? (
                <h3 className={styles.titleWrapper}>
                    <span className={styles.title}>{title}</span>
                </h3>
            ) : null}
            {subtitle ? (
                <p className={styles.subtitleWrapper}>
                    <span className={styles.subtitle}>{subtitle}</span>
                </p>
            ) : null}
            <div className={styles.chart}>
                <Chart data={data} lang={lang} />
            </div>
        </div>
    );
}
