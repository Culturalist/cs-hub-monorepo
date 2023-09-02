import { Breakpoint } from 'globals';

const metrics: Metrics = {
    breakpoints: {
        xs: 512,
        sm: 796,
        md: 984,
        lg: 1268
    },
    pd: {
        xs: 3,
        sm: 2,
        md: 2,
        lg: 2
    },
    grid: {
        unit: 4,
        offset: 20,
        xs: {
            module: 32,
            gutter: 8
        },
        sm: {
            module: 20,
            gutter: 12
        },
        md: {
            module: 24,
            gutter: 16
        },
        lg: {
            module: 32,
            gutter: 20
        }
    }
};

export default metrics;

interface Metrics {
    breakpoints: Record<Breakpoint, number>;
    pd: Record<Breakpoint, number>;
    grid: {
        unit: number;
        offset: number;
    } & Record<
        Breakpoint,
        {
            module: number;
            gutter: number;
        }
    >;
}
