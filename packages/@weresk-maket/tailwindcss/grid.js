const plugin = require("tailwindcss/plugin");
const { numeric, addStyle, sortStyles } = require("./utils");

const defaultOptions = {
    unit: 4,
    steps: 20,
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 20, 24],
    color: "250 150 60" // Orange
};

const grid = plugin(
    function ({ addBase, theme }) {
        // Base
        const baseStyles = {};

        // Container
        Object.entries(theme("screens")).forEach((screen) => {
            addStyle(baseStyles, ":root", [[`--metrics-container`, screen[1]]], screen[1]);
        });

        // Unit, Columns, Module, Gutter, Offset
        ["unit", "columns", "module", "gutter", "offset"].forEach((prop) => {
            Object.keys(theme(`grid.${prop}`)).forEach((key) => {
                if (key === "DEFAULT") {
                    addStyle(baseStyles, ":root", [[`--metrics-${prop}`, theme(`grid.${prop}.DEFAULT`)]]);
                } else {
                    addStyle(
                        baseStyles,
                        ":root",
                        [[`--metrics-${prop}`, theme(`grid.${prop}.${key}`)]],
                        theme(`screens.${key}`)
                    );
                }
            });
        });

        // Marking
        addStyle(baseStyles, ":root", [["--grid-color", theme("grid.marking.color") || defaultOptions.color]]);

        // Create styles
        addBase(sortStyles(baseStyles));
    },
    {
        theme: {
            screens: {
                xs: "512px",
                sm: "796px",
                md: "984px",
                lg: "1268px"
            },
            grid: {
                unit: {
                    DEFAULT: `${defaultOptions.unit}px`
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
                    DEFAULT: "20px"
                },
                zoom: {
                    DEFAULT: "off"
                },
                marking: {
                    color: defaultOptions.color
                },
                ruler: {
                    steps: defaultOptions.steps,
                    modules: defaultOptions.modules
                }
            },
            spacing: ({ theme }) => {
                const unit = numeric(theme("grid.unit.DEFAULT")) || defaultOptions.unit;
                const steps = numeric(theme("grid.ruler.steps")) || defaultOptions.steps;
                const modules = theme("grid.ruler.modules") || defaultOptions.modules;

                return Object.fromEntries([
                    ...[...new Array(steps + 1)].map((v, i) => [`${unit * i}`, `${unit * i}px`]),
                    ["module", "var(--metrics-module)"],
                    ["gutter", "var(--metrics-gutter)"],
                    ["offset", "var(--metrics-offset)"],
                    ...modules.map((m) => [
                        `m${m}`,
                        `calc(${m} * var(--metrics-module) + ${m - 1} * var(--metrics-gutter))`
                    ])
                ]);
            }
        }
    }
);

module.exports = grid;
