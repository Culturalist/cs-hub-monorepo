const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const { numeric, addStyle, sortStyles } = require("../utils");

const defaultOptions = {
    prefix: "typo"
};

const typography = plugin(
    function ({ addBase, addComponents, addVariant, theme }) {
        // Antialiasing
        addBase({
            html: {
                "-webkit-font-smoothing": "antialiased",
                "-moz-osx-font-smoothing": "grayscale",
                textRendering: "optimizeLegibility"
            }
        });

        if (theme("typography.fonts")) {
            Object.entries(theme("typography.fonts")).forEach(([fontId, font]) => {
                // Imports
                if (font.imports?.length) {
                    font.imports.forEach((face) => {
                        addBase({
                            "@font-face": {
                                fontFamily: `"${font.familyName || fontId}"`,
                                fontStyle: face.style || "normal",
                                fontWeight: face.weight || "400",
                                src: face.src || "",
                                fontDisplay: "swap"
                            }
                        });
                    });
                }

                // Metrics
                if (font.metrics) {
                    Object.entries(font.metrics).forEach((mode) => {
                        addBase({
                            [`html[data-useragent='${mode[0]}']`]: {
                                [`--${fontId.toUpperCase()}-CH`]: `${numeric(mode[1].capHeight) || 0}em`,
                                [`--${fontId.toUpperCase()}-XH`]: `${numeric(mode[1].xHeight) || 0}em`,
                                [`--${fontId.toUpperCase()}-B`]: `${numeric(mode[1].bottom) || 0}em`,
                                [`--${fontId.toUpperCase()}-I`]: `${numeric(mode[1].inset) || 0}em`
                            }
                        });
                    });
                }

                // Use font
                const fontVariables = {
                    "--cap-height": `var(--${fontId.toUpperCase()}-CH)`,
                    "--x-height": `var(--${fontId.toUpperCase()}-XH)`,
                    "--bottom-height": `var(--${fontId.toUpperCase()}-B)`,
                    "--inset": `var(--${fontId.toUpperCase()}-I)`
                };
                // Font class
                addBase({ [`.font-${fontId}`]: fontVariables });
                if (font.included) {
                    // Font extended category
                    addBase({ [`.font-${font.included}`]: fontVariables });
                    if (font.included === "sans") {
                        // Category by default
                        addBase({ body: fontVariables });
                    }
                }
            });
        }

        // Text styles
        if (theme("typography.styles")) {
            const textStyles = {};

            Object.entries(theme("typography.styles")).forEach(([styleId, style]) => {
                Object.entries(style).forEach(([key, value]) => {
                    let screen;
                    let props = [[key, value]];
                    // Check if style property is a specific media properties
                    if (Object.keys(theme("screens")).includes(key) && typeof value === "object") {
                        screen = theme(`screens.${key}`);
                        props = Object.entries(value);
                    }
                    props.forEach(([pk, pv]) => {
                        let properties = [[pk, pv]];
                        if (pk === "fontFamily" || pk === "font") {
                            // properties = [["fontFamily", pv in theme("fontFamily") ? theme(`fontFamily.${pv}`) : pv]];
                            properties = [[`@apply font-${pv}`, {}]];
                        }
                        // Extract font size and line height from fontSize property
                        if (pk === "fontSize") {
                            const [fontSize, lineHeight] = typeof pv === "string" ? pv.split("/") : [pv, pv];
                            properties = [
                                ["--font-size", `${numeric(fontSize)}`],
                                ["--line-height", `${numeric(lineHeight || fontSize)}`]
                            ];
                        }
                        addStyle(textStyles, `.${defaultOptions.prefix}-${styleId}`, properties, screen);
                    });
                    // Font size calculation
                    addStyle(textStyles, `.${defaultOptions.prefix}-${styleId}`, [
                        ["fontSize", "calc(var(--font-size) * var(--metrics-scale))"],
                        ["lineHeight", "calc(var(--line-height) * var(--metrics-scale))"]
                    ]);
                });
            });

            addComponents(sortStyles(textStyles));
        }

        // Trim components
        const calcTrim = {
            "--line-height-extra": "calc((var(--line-height) - var(--font-size)) / 2)",
            "--top-offset-x": `calc(var(--line-height-extra) * var(--metrics-scale) + var(--x-height))`,
            "--top-offset-cap": `calc(var(--line-height-extra) * var(--metrics-scale) + var(--cap-height))`,
            "--bottom-offset": `calc(var(--line-height-extra) * var(--metrics-scale) + var(--bottom-height))`
        };
        addComponents({
            ".trim-x": {
                display: "block",
                marginTop: "calc(var(--top-offset-x) * -1)",
                marginBottom: "calc(var(--bottom-offset) * -1)",
                marginLeft: "calc(var(--inset) * -1)",
                marginRight: "calc(var(--inset) * -1)",
                ...calcTrim
            },
            ".trim-cap": {
                display: "block",
                marginTop: "calc(var(--top-offset-cap) * -1)",
                marginBottom: "calc(var(--bottom-offset) * -1)",
                marginLeft: "calc(var(--inset) * -1)",
                marginRight: "calc(var(--inset) * -1)",
                ...calcTrim
            },
            ".trim-line": {
                display: "block",
                paddingTop: "var(--bottom-offset)",
                marginBottom: "calc(var(--bottom-offset) * -1)",
                marginLeft: "calc(var(--inset) * -1)",
                marginRight: "calc(var(--inset) * -1)",
                ...calcTrim
            },
            ".trim-bottom": {
                display: "block",
                marginBottom: "calc(var(--bottom-offset) * -1)",
                ...calcTrim
            }
        });
        //Variant modifier to target direct spans inside selector
        addVariant("span", "& > span");

        // Outline
        if (theme("typography.outline")) {
            Object.entries(theme("typography.outline")).forEach(([key, value]) => {
                addComponents({
                    [`@supports (-webkit-text-stroke-width: calc(${numeric(value)} * var(--metrics-scale)))`]: {
                        [`.text-outline${key === "DEFAULT" ? "" : `-${key}`}`]: {
                            "-webkit-text-fill-color": "transparent",
                            "-webkit-text-stroke-color": "inherit",
                            "-webkit-text-stroke-width": `calc(${numeric(value)} * var(--metrics-scale))`,
                            paddingLeft: `calc(${numeric(value)} * var(--metrics-scale))`,
                            paddingRight: `calc(${numeric(value)} * var(--metrics-scale))`
                        }
                    }
                });
            });
        }
    },
    {
        theme: {
            typography: {
                fonts: {
                    inter: {
                        familyName: "Inter",
                        extends: "sans",
                        included: "sans",
                        imports: [
                            {
                                style: "normal",
                                weight: 300,
                                src: `url(https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa0ZL7W0Q5n-wU.woff2) format('woff2')`
                            },
                            {
                                style: "normal",
                                weight: 400,
                                src: `url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZthiJ-Ek-_EeAmM.woff2) format('woff2')`
                            },
                            {
                                style: "normal",
                                weight: 500,
                                src: `url(https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa2JL7W0Q5n-wU.woff2) format('woff2')`
                            }
                        ],
                        metrics: {
                            hhea: {
                                capHeight: 0.205,
                                xHeight: 0.43,
                                bottom: 0.102,
                                inset: 0.08
                            },
                            typo: {
                                capHeight: 0.2,
                                xHeight: 0.425,
                                bottom: 0.105,
                                inset: 0.08
                            }
                        }
                    }
                }
            },
            outline: {
                DEFAULT: 1
            },
            fontFamily: ({ theme }) => {
                const fonts = [];
                Object.entries(theme("typography.fonts")).forEach((font) => {
                    let family = font[1].familyName ? [`"${font[1].familyName}"`] : [font[0]];
                    // Extends
                    if (font[1].extends && defaultTheme.fontFamily[font[1].extends]) {
                        fonts.push([font[0], [...family, ...defaultTheme.fontFamily[font[1].extends]]]);
                    } else {
                        fonts.push([font[0], family]);
                    }
                    //Included
                    if (font[1].included && defaultTheme.fontFamily[font[1].included]) {
                        fonts.push([font[1].included, [...family, ...defaultTheme.fontFamily[font[1].included]]]);
                    }
                });
                return Object.fromEntries(fonts);
            }
        }
    }
);

module.exports = typography;
