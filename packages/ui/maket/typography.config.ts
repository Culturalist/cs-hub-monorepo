import type { TypographyConfig } from "@weresk/maket";

const typographyConfig: TypographyConfig = {
    typography: {
        fonts: {
            mabry: {
                familyName: "Mabry Pro",
                extends: "sans",
                imports: [
                    {
                        style: "normal",
                        weight: "300",
                        src: `url(/fonts/mabry-light-pro.otf) format("opentype")`
                    },
                    {
                        style: "normal",
                        weight: "400",
                        src: `url(/fonts/mabry-regular-pro.otf) format("opentype")`
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
        },
        styles: {
            lead: {
                fontSize: "36/40",
                fontWeight: "300",
                sm: {
                    fontSize: "48/56"
                }
            },
            paragraph: {
                fontSize: "24/32",
                fontWeight: "300",
                letterSpacing: "-0.02em",
                sm: {
                    fontSize: "28/40"
                }
            },
            "paragraph-sm": {
                fontSize: "20/24",
                fontWeight: "300",
                letterSpacing: "-0.02em"
            },
            "title-lg": {
                fontSize: "32",
                letterSpacing: "-0.02em"
            },
            title: {
                fontSize: "24",
                letterSpacing: "-0.02em"
            },
            "title-sm": {
                fontSize: "20",
                letterSpacing: "-0.02em"
            },
            "short-lg": {
                fontSize: "20/24",
                letterSpacing: "-0.01em"
            },
            short: {
                fontSize: "16/20",
                letterSpacing: "-0.01em"
            },
            "short-sm": {
                fontSize: "16/20",
                sm: {
                    fontSize: "12/16"
                }
            },
            "caps-huge": {
                fontSize: "64",
                textTransform: "uppercase",
                md: {
                    fontSize: "88"
                },
                lg: {
                    fontSize: "120"
                }
            },
            "caps-3xl": {
                fontSize: "48",
                textTransform: "uppercase",
                sm: {
                    fontSize: "72"
                },
                lg: {
                    fontSize: "88"
                }
            },
            "caps-2xl": {
                fontSize: "48",
                textTransform: "uppercase",
                sm: {
                    fontSize: "72"
                }
            },
            "caps-xl": {
                fontSize: "48/52",
                textTransform: "uppercase"
            },
            "caps-lg": {
                fontSize: "40/44",
                textTransform: "uppercase"
            },
            caps: {
                fontSize: "32/36",
                textTransform: "uppercase"
            },
            "caps-sm": {
                fontSize: "24",
                textTransform: "uppercase"
            },
            "caps-xs": {
                fontSize: "20",
                textTransform: "uppercase"
            },
            "caps-2xs": {
                fontSize: "16",
                textTransform: "uppercase"
            },
            "caps-3xs": {
                fontSize: "12",
                textTransform: "uppercase"
            }
        },
        outline: {
            DEFAULT: "1",
            thin: "0.5",
            thick: "1.5"
        },
        constants: {
            hyphenWordLengthLimit: 14
        }
    }
};

export default typographyConfig;
