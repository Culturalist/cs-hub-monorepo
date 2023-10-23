/**
 * @type {import('postcss').PluginCreator}
 */
const defaultConfig = require("./default.config");

const setValue = (value, vtype, initial = undefined) => (value && typeof value === vtype ? value : initial);

module.exports = (opts = defaultConfig) => {
    const { breakpoints } = opts;
    const breakpointsToSet = [];
    if (breakpoints && Array.isArray(breakpoints) && breakpoints.length) {
        breakpoints.forEach((br, i) => {
            const set = {
                name: setValue(br.name, "string", i),
                width: setValue(br.width, "number"),
                columns: setValue(br.columns, "number"),
                offset: setValue(br.offset, "number", 0),
                module: setValue(br.module, "number"),
                gutter: setValue(br.gutter, "number"),
                zoom: "off"
            };
            if (!set.width && set.columns && set.gutter && set.module) {
                set.width = set.columns * (set.module + set.gutter) - set.gutter + 2 * set.offset;
            }
            breakpointsToSet.push(set);
        });
    }
    const initial = {
        unit: setValue(opts.unit, "number"),
        columns: setValue(opts.columns, "number"),
        offset: setValue(opts.offset, "number", 0),
        module: setValue(opts.module, "number"),
        gutter: setValue(opts.gutter, "number")
    };

    return {
        postcssPlugin: "set-grid",
        prepare(result) {
            return {
                AtRule(rule, { Declaration, Rule, AtRule, Root }) {
                    if (rule.name === "grid-config") {
                        const root = new Root();
                        const media = new Rule({ selector: ":root" });
                        const variables = new Rule({ selector: ":root" });

                        breakpointsToSet.forEach((br) => {
                            // Media variable
                            const mediaVariable = new Declaration({
                                prop: `--media-${br.name}`,
                                value: br.width.toString()
                            });
                            media.append(mediaVariable);

                            // Breakpoints
                            const breakpoint = new AtRule({ name: "media", params: `(min-width: ${br.width}px)` });
                            const breakpointRoot = new Rule({ selector: ":root" });

                            // Breakpoint metrics
                            br.columns &&
                                breakpointRoot.append(
                                    new Declaration({ prop: "--metrics-columns", value: br.columns.toString() })
                                );
                            br.module &&
                                breakpointRoot.append(
                                    new Declaration({ prop: "--metrics-module", value: `${br.module}px` })
                                );
                            br.gutter &&
                                breakpointRoot.append(
                                    new Declaration({ prop: "--metrics-gutter", value: `${br.gutter}px` })
                                );
                            br.offset &&
                                breakpointRoot.append(
                                    new Declaration({ prop: "--metrics-offset", value: `${br.offset}px` })
                                );
                            breakpoint.append(breakpointRoot);

                            // Grid container class
                            const gridSelector = new Rule({ selector: ".grid-container" });
                            gridSelector.append(new Declaration({ prop: "max-width", value: `${br.width}px` }));

                            breakpoint.append(gridSelector);
                            root.append(breakpoint);
                        });

                        // Default metrics
                        initial.columns &&
                            variables.append(
                                new Declaration({ prop: "--metrics-columns", value: initial.columns.toString() })
                            );
                        initial.unit &&
                            variables.append(new Declaration({ prop: "--metrics-unit", value: `${initial.unit}px` }));
                        initial.module &&
                            variables.append(
                                new Declaration({ prop: "--metrics-module", value: `${initial.module}px` })
                            );
                        initial.gutter &&
                            variables.append(
                                new Declaration({ prop: "--metrics-gutter", value: `${initial.gutter}px` })
                            );
                        initial.offset &&
                            variables.append(
                                new Declaration({ prop: "--metrics-offset", value: `${initial.offset}px` })
                            );

                        // Modules variables
                        defaultConfig.modules &&
                            defaultConfig.modules.length &&
                            defaultConfig.modules.forEach((n) => {
                                variables.append(
                                    new Declaration({
                                        prop: `--module-${n}`,
                                        value: `calc(${n} * var(--metrics-module) + ${n - 1} * var(--metrics-gutter))`
                                    })
                                );
                            });

                        // Grid color
                        if (defaultConfig.color) {
                            variables.append(
                                new Declaration({
                                    prop: "--grid-color",
                                    value: defaultConfig.color
                                })
                            );
                        }

                        root.insertBefore(0, variables);
                        root.insertBefore(0, media);
                        rule.replaceWith(root);
                    }
                }
            };
        }
    };
};

module.exports.postcss = true;
