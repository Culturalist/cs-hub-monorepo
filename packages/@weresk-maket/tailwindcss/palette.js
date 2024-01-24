const plugin = require("tailwindcss/plugin");
const { addStyle, sortStyles } = require("../utils");

const palette = plugin(
    function ({ addBase, theme }) {
        // Base
        const baseStyles = {};

        // Swatches
        if (theme("swatches")) {
            Object.entries(theme("swatches")).forEach(([id, value]) => {
                addStyle(baseStyles, ":root", [[`--swatch-${id}`, value]]);
            });
        }

        // Palette
        if (theme("palette")) {
            Object.entries(theme("palette")).forEach(([id, value]) => {
                addStyle(baseStyles, ":root", [[`--palette-${id}`, value]]);
            });
        }

        // Create styles
        addBase(sortStyles(baseStyles));
    },
    {
        theme: {
            swatches: {
                white: "255 255 255",
                black: "50 50 50",
                grey: "153 153 153",
                orange: "250 150 60"
            },
            palette: ({ theme }) => ({
                surface: theme("swatches.white"),
                "on-surface": theme("swatches.black"),
                "on-surface-light": theme("swatches.grey"),
                primary: theme("swatches.orange"),
                "on-primary": theme("swatches.white")
            }),
            colors: ({ theme }) => ({
                ...Object.fromEntries(Object.entries(theme("swatches")).map(([id, value]) => [id, `rgb(${value})`])),
                ...Object.fromEntries(
                    Object.entries(theme("palette")).map(([id, value]) => [id, `rgb(var(--palette-${id}))`])
                )
            })
        }
    }
);

module.exports = palette;
