const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");
const { numeric, addStyle, sortStyles } = require("./utils");

const defaultOptions = {};

const typography = plugin(
    function ({ addBase, addComponents, addUtilities, theme }) {
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
                                fontFamily: font.familyName || fontId,
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
                if (font.extends) {
                    // Font extended category
                    addBase({ [`.font-${font.extends}`]: fontVariables });
                    if (font.extends === "sans") {
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
                        // Extract font size and line height from fontSize property
                        if (pk === "fontSize") {
                            const [fontSize, lineHeight] = typeof pv === "string" ? pv.split("/") : [pv, pv];
                            properties = [
                                ["--font-size", `${numeric(fontSize)}`],
                                ["--line-height", `${numeric(lineHeight || fontSize)}`]
                            ];
                        }
                        addStyle(textStyles, `.typo-${styleId}`, properties, screen);
                    });
                    // Font size calculation
                    addStyle(textStyles, `.typo-${styleId}`, [
                        ["fontSize", "calc(var(--font-size) * 1px)"],
                        ["lineHeight", "calc(var(--line-height) * 1px)"]
                    ]);
                });
            });

            addComponents(sortStyles(textStyles));
        }

        // Trim components
        const calcTrim = {
            "--line-height-extra": "calc((var(--line-height) - var(--font-size)) / 2)",
            "--top-offset-x": `calc(var(--line-height-extra) * 1px + var(--x-height))`,
            "--top-offset-cap": `calc(var(--line-height-extra) * 1px + var(--cap-height))`,
            "--bottom-offset": `calc(var(--line-height-extra) * 1px + var(--bottom-height))`
        };
        addComponents({
            ".trim-x": {
                display: "block",
                marginTop: "calc(var(--top-offset-x) * -1)",
                marginBottom: "calc(var(--bottom-offset) * -1)",
                marginLeft: "calc(var(--inset) * -1)",
                ...calcTrim
            },
            ".trim-cap": {
                display: "block",
                marginTop: "calc(var(--top-offset-cap) * -1)",
                marginBottom: "calc(var(--bottom-offset) * -1)",
                marginLeft: "calc(var(--inset) * -1)",
                ...calcTrim
            },
            ".trim-line": {
                display: "block",
                paddingTop: "var(--bottom-offset)",
                marginBottom: "calc(var(--bottom-offset) * -1)",
                marginLeft: "calc(var(--inset) * -1)",
                ...calcTrim
            },
            ".trim-bottom": {
                display: "block",
                marginBottom: "calc(var(--bottom-offset) * -1)",
                ...calcTrim
            }
        });

        // Outline
        if (theme("typography.outline")) {
            Object.entries(theme("typography.outline")).forEach(([key, value]) => {
                addComponents({
                    [`@supports (-webkit-text-stroke-width: ${numeric(value)}px)`]: {
                        [`.text-outline${key === "DEFAULT" ? "" : `-${key}`}`]: {
                            "-webkit-text-fill-color": "transparent",
                            "-webkit-text-stroke-color": "inherit",
                            "-webkit-text-stroke-width": `${numeric(value)}px`,
                            paddingLeft: `${numeric(value)}px`,
                            paddingRight: `${numeric(value)}px`
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
                    let family = font[1].familyName ? [font[1].familyName] : [];
                    if (font[1].extends && defaultTheme.fontFamily[font[1].extends]) {
                        family = [...family, ...defaultTheme.fontFamily[font[1].extends]];
                        fonts.push([font[1].extends, family]);
                    }
                    fonts.push([font[0], family]);
                });
                return Object.fromEntries(fonts);
            }
        }
    }
);

module.exports = typography;
