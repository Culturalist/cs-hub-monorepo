const plugin = require("tailwindcss/plugin");
const { numeric, cssValue, addStyle, sortStyles, sortScreens } = require("../utils");
const { min, max } = require("lodash");

const defaultOptions = {
    unit: 4,
    steps: 20,
    modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 20, 24],
    color: "250 150 60" // Orange
};

const grid = plugin(
    function ({ addBase, addComponents, theme }) {
        const sortedScreens = sortScreens(theme("screens"));
        // Base
        const baseStyles = {};

        // Scale & Container
        if (sortedScreens.length) {
            // Minimal width
            addStyle(baseStyles, ":root", [
                [
                    `--metrics-scale`,
                    !theme("grid.scale") || theme("grid.scale.min")
                        ? "1px"
                        : `calc(100vw / ${numeric(sortedScreens[0][1])})`
                ],
                ["--metrics-container", "100%"]
            ]);
            // For each screen
            sortedScreens.forEach(([media, width], i) => {
                const nextWidth = i < sortedScreens.length - 1 ? sortedScreens[i + 1][1] : width;
                let scaleValue = theme("grid.scale") ? `calc(100vw / ${numeric(nextWidth)})` : "1px";
                let containerValue = theme("grid.scale")
                    ? `calc(${numeric(nextWidth)}px * var(--metrics-scale))`
                    : cssValue(width, "px");
                if (theme("grid.scale")) {
                    if (
                        (theme("grid.scale.min") &&
                            numeric(width) < numeric(theme(`screens.${theme("grid.scale.min")}`))) ||
                        (theme("grid.scale.max") &&
                            numeric(width) >= numeric(theme(`screens.${theme("grid.scale.max")}`)))
                    ) {
                        scaleValue = "1px";
                        containerValue = cssValue(width, "px");
                    }
                    addStyle(baseStyles, ":root", [[`--metrics-scale`, scaleValue]], cssValue(width, "px"));
                }
                addStyle(baseStyles, ":root", [[`--metrics-container`, containerValue]], cssValue(width, "px"));
            });
        }

        // Unit, Columns, Module, Gutter, Offset
        ["unit", "columns", "module", "gutter", "offset"].forEach((prop) => {
            Object.keys(theme(`grid.${prop}`)).forEach((screen) => {
                const value =
                    prop === "columns"
                        ? cssValue(theme(`grid.${prop}.${screen}`), "")
                        : `calc(${numeric(theme(`grid.${prop}.${screen}`))} * var(--metrics-scale))`;
                if (screen === "DEFAULT") {
                    addStyle(baseStyles, ":root", [[`--metrics-${prop}`, value]]);
                } else {
                    addStyle(
                        baseStyles,
                        ":root",
                        [[`--metrics-${prop}`, value]],
                        cssValue(theme(`screens.${screen}`), "px")
                    );
                }
            });
        });

        // Container class
        addComponents({
            ".grid-container": {
                maxWidth: "var(--metrics-container)"
            }
        });

        // Marking
        if (theme("grid.color") && typeof theme("grid.color") === "object") {
            Object.entries(theme("grid.color")).forEach(([screen, value]) => {
                if (screen === "DEFAULT") {
                    addStyle(baseStyles, ":root", [["--grid-color", value]]);
                } else {
                    addStyle(
                        baseStyles,
                        ":root",
                        [["--grid-color", value]],
                        cssValue(theme(`screens.${screen}`), "px")
                    );
                }
            });
        } else {
            addStyle(baseStyles, ":root", [["--grid-color", theme("grid.color") || defaultOptions.color]]);
        }

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
                scale: {
                    DEFAULT: "off"
                },
                color: { DEFAULT: defaultOptions.color },
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
                    ["1", "var(--metrics-scale)"],
                    ["2", "calc(2 * var(--metrics-scale))"],
                    ["3", "calc(3 * var(--metrics-scale))"],
                    ...[...new Array(steps + 1)].map((v, i) => [
                        `${unit * i}`,
                        `calc(${unit * i} * var(--metrics-scale))`
                    ]),
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
