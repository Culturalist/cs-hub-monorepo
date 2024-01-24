/** @type {import('tailwindcss').Config} */
import { maketConfig } from "./maket";

const maket = require("../@weresk-maket/_backup/tailwindcss");

module.exports = {
    theme: {
        ...maketConfig,
        extend: {
            spacing: {
                "bar-height": "var(--c-bar-height)",
                "logo-height": "var(--c-logo-height)",
                "header-height": "var(--c-header-height)",
                "hero-height": "var(--c-hero-height)"
            },
            invert: {
                "header-logo": "var(--header-logo-lightness)",
                "footer-logo": "var(--footer-logo-lightness)"
            },
            maxWidth: ({ theme }) => theme("spacing"),
            minHeight: ({ theme }) => ({
                ...theme("spacing"),
                "hero-height": "var(--c-hero-height)",
                "page-height": "var(--c-page-min-height)"
            })
        }
    },
    plugins: [maket.grid, maket.typography, maket.palette],
    mode: "jit",
    content: [
        "./components/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/components/**/*.{js,ts,jsx,tsx}"
    ]
};
