/**
 * @type {import('postcss').PluginCreator}
 */
const defaultTheme = require("tailwindcss/defaultTheme");
const defaultConfig = require("../default.config");

module.exports = (opts = defaultConfig) => {
    const { fonts, styles, antialiasing = true } = opts;

    return {
        postcssPlugin: "set-typo",
        prepare(result) {
            return {
                AtRule(rule, { Declaration, Rule, AtRule, Root }) {
                    // console.log(rule.name + " " + rule.params);
                    // Typo config
                    if (rule.name === "typo-config") {
                        const root = new Root();

                        // Fonts
                        if (fonts?.length) {
                            const imports = new Root();
                            const metrics = new Root();

                            fonts.forEach((font, i) => {
                                // Imports
                                if (font.imports?.length) {
                                    font.imports.forEach((face) => {
                                        const fontImport = new AtRule({
                                            name: "font-import"
                                        });
                                        fontImport.append(
                                            new Declaration({
                                                prop: "font-family",
                                                value: font.familyName
                                            })
                                        );
                                        fontImport.append(
                                            new Declaration({
                                                prop: "font-style",
                                                value: face.style
                                            })
                                        );
                                        fontImport.append(
                                            new Declaration({
                                                prop: "font-weight",
                                                value: face.weight.toString()
                                            })
                                        );
                                        fontImport.append(
                                            new Declaration({
                                                prop: "src",
                                                value: face.src
                                            })
                                        );
                                        fontImport.append(
                                            new Declaration({
                                                prop: "font-display",
                                                value: "swap"
                                            })
                                        );
                                        imports.append(fontImport);
                                    });
                                }

                                // Metrics
                                if (font.metrics) {
                                    const ID = font.id.toUpperCase();
                                    const variants = ["hhea", "typo"];

                                    variants.forEach((v) => {
                                        const variables = new Rule({ selector: `html[data-useragent="${v}"]` });

                                        // cap-height
                                        variables.append(
                                            new Declaration({
                                                prop: `--${ID}-CH`,
                                                value: `${font.metrics[v].capHeight || 0}em`
                                            })
                                        );
                                        // x-height
                                        variables.append(
                                            new Declaration({
                                                prop: `--${ID}-XH`,
                                                value: `${font.metrics[v].xHeight || 0}em`
                                            })
                                        );
                                        // bottom height
                                        variables.append(
                                            new Declaration({
                                                prop: `--${ID}-B`,
                                                value: `${font.metrics[v].bottom || 0}em`
                                            })
                                        );
                                        // inset
                                        variables.append(
                                            new Declaration({
                                                prop: `--${ID}-I`,
                                                value: `${font.metrics[v].inset || 0}em`
                                            })
                                        );

                                        metrics.append(variables);
                                    });
                                }
                            });

                            root.append(imports);
                            root.append(metrics);
                        }

                        rule.replaceWith(root);
                    }

                    // Typo components
                    else if (rule.name === "typo-components") {
                        const root = new Root({ layer: "components" });

                        if (fonts?.length) {
                            fonts.forEach((font) => {
                                // Use font
                                const ID = font.id.toUpperCase();
                                const fontFamily = `"${font.familyName}"${
                                    font.extends ? `, ${defaultTheme.fontFamily[font.extends]?.join(", ")}` : ""
                                }`;
                                const useRule = new Rule({ selector: `.use-${font.id}` });
                                useRule.append(
                                    new Declaration({
                                        prop: "font-family",
                                        value: fontFamily
                                    })
                                );
                                useRule.append(
                                    new Declaration({
                                        prop: "--line-height-extra",
                                        value: "calc((var(--line-height) - var(--font-size)) / 2)"
                                    })
                                );
                                useRule.append(
                                    new Declaration({
                                        prop: "--top-offset-x",
                                        value: `calc(var(--line-height-extra) * 1px + var(--${ID}-XH))`
                                    })
                                );
                                useRule.append(
                                    new Declaration({
                                        prop: "--top-offset-cap",
                                        value: `calc(var(--line-height-extra) * 1px + var(--${ID}-CH))`
                                    })
                                );
                                useRule.append(
                                    new Declaration({
                                        prop: "--bottom-offset",
                                        value: `calc(var(--line-height-extra) * 1px + var(--${ID}-B))`
                                    })
                                );
                                useRule.append(
                                    new Declaration({
                                        prop: "--inset",
                                        value: `var(--${ID}-I)`
                                    })
                                );
                                root.append(useRule);
                            });
                        }

                        if (styles?.length) {
                            styles.forEach((style) => {
                                if (style.props) {
                                    const parentRule = new Rule({ selector: `.typo-${style.id}` });

                                    // font size calc
                                    parentRule.append(
                                        new Declaration({
                                            prop: "font-size",
                                            value: "calc(var(--font-size) * 1px)"
                                        })
                                    );
                                    parentRule.append(
                                        new Declaration({
                                            prop: "line-height",
                                            value: "calc(var(--line-height) * 1px)"
                                        })
                                    );

                                    style.props.forEach((s) => {
                                        // if media is specified create media specific rule, otherwise add to parent rule
                                        let media = "";
                                        if (s.mediaMin) {
                                            media = `(min-width: --media-${s.mediaMin})`;
                                        } else if (s.mediaMax) {
                                            media = `(max-width: --media-${s.mediaMax})`;
                                        }
                                        const styleRule = !media
                                            ? parentRule
                                            : new Rule({ selector: `.typo-${style.id}` });

                                        // if font is specified add @apply rule
                                        const applyClasses = [];
                                        s.fontId && applyClasses.push(`use-${s.fontId}`);
                                        applyClasses.length &&
                                            styleRule.append(
                                                new AtRule({ name: "apply", params: applyClasses.join(" ") })
                                            );

                                        // font size
                                        s.fontSize &&
                                            styleRule.append(
                                                new Declaration({
                                                    prop: "--font-size",
                                                    value: s.fontSize.toString()
                                                })
                                            );
                                        // line height
                                        s.lineHeight &&
                                            styleRule.append(
                                                new Declaration({
                                                    prop: "--line-height",
                                                    value: s.lineHeight.toString()
                                                })
                                            );
                                        // letter spacing
                                        s.letterSpacing &&
                                            styleRule.append(
                                                new Declaration({
                                                    prop: "letter-spacing",
                                                    value: `${s.letterSpacing}em`
                                                })
                                            );
                                        // font weight
                                        s.fontWeight &&
                                            styleRule.append(
                                                new Declaration({
                                                    prop: "font-weight",
                                                    value: `${s.fontWeight}`
                                                })
                                            );
                                        // text transform
                                        s.textTransform &&
                                            styleRule.append(
                                                new Declaration({
                                                    prop: "text-transform",
                                                    value: s.textTransform
                                                })
                                            );

                                        // if media is specified wrap selector with media query
                                        if (media) {
                                            const mediaRule = new AtRule({ name: "media", params: media });
                                            mediaRule.append(styleRule);
                                            root.append(mediaRule);
                                        }
                                    });

                                    root.append(parentRule);
                                }
                            });
                        }

                        rule.replaceWith(root);
                    }
                }
                // OnceExit() {
                //     console.log(result.css);
                // }
            };
        }
    };
};

module.exports.postcss = true;
