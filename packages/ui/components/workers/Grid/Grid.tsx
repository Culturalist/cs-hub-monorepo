import { DefaultStyleProps } from 'globals';
import { createStyles } from './Grid.styles';

interface GridProps extends DefaultStyleProps {}

export default function Grid(props: GridProps) {
    const { className } = props;
    const styles = createStyles({ className });

    return (
        <div className={styles.container}>
            <div className={styles.rows}></div>
            <div className={styles.columns}>
                {[...Array(72)].map((x, i) => (
                    <div className={styles.column} key={i}></div>
                ))}
            </div>
            <div className={styles.grid}></div>
        </div>
    );
}
