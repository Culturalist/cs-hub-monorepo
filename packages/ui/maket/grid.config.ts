import type { GridConfig } from "@weresk/maket";

const gridConfig: GridConfig = {
    screens: {
        xs: "512px",
        sm: "796px",
        md: "984px",
        lg: "1268px"
    },
    grid: {
        unit: {
            DEFAULT: "4px"
        },
        columns: {
            DEFAULT: "12",
            xs: "12",
            sm: "24"
        },
        module: {
            DEFAULT: "32px",
            xs: "32px",
            sm: "20px",
            md: "24px",
            lg: "32px"
        },
        gutter: {
            DEFAULT: "8px",
            xs: "8px",
            sm: "12px",
            md: "16px",
            lg: "20px"
        },
        offset: {
            DEFAULT: "20px",
            xs: "20px",
            sm: "20px",
            md: "20px",
            lg: "20px"
        },
        ruler: {
            steps: 30,
            modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 24]
        }
    },
    pd: {
        DEFAULT: 3,
        xs: 3,
        sm: 2,
        md: 2,
        lg: 2
    }
};

export default gridConfig;
