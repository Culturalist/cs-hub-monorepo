import { BodyBlock } from "@cs/data/schemas";
import { DefaultProps } from "@cs/globals";
import { createStyles } from "./Base.styles";

interface BaseProps extends DefaultProps {
    data?: BodyBlock[];
}

export default function Base(props: BaseProps) {
    const { data, lang, className } = props;
    if (!data) return null;

    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
}
