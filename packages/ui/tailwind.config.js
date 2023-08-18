/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    theme: {
        screens: {
            sm: '644px',
            md: '956px',
            lg: '1268px',
            'max-sm': { max: '643px' },
            'max-md': { max: '955px' },
            'max-lg': { max: '1267px' }
        },
        fontFamily: {
            sans: ['Mabry Pro', ...defaultTheme.fontFamily.sans]
        },
        fontSize: {
            12: '12px',
            16: '16px',
            20: '20px',
            24: '24px',
            28: '28px',
            32: '32px',
            36: '36px',
            40: '40px',
            48: '48px',
            56: '56px',
            64: '64px',
            72: '72px',
            80: '80px'
        },
        lineHeight: {
            12: '12px',
            16: '16px',
            20: '20px',
            24: '24px',
            28: '28px',
            32: '32px',
            36: '36px',
            40: '40px',
            48: '48px',
            56: '56px',
            64: '64px',
            72: '72px',
            80: '80px'
        },
        colors: {
            red: 'rgb(255 0 0)',
            white: 'rgb(var(--swatch-white))',
            black: 'rgb(var(--swatch-black))',
            blue: 'rgb(var(--swatch-blue))',
            green: 'rgb(var(--swatch-green))',
            skyblue: 'rgb(var(--swatch-sky-blue))',
            grey: 'rgb(var(--swatch-grey))',
            theme: {
                surface: 'rgb(var(--theme-surface))',
                text: 'rgb(var(--theme-text))',
                'text-light': 'rgb(var(--theme-text-light))',
                card: {
                    surface: 'rgb(var(--theme-card-surface))',
                    text: 'rgb(var(--theme-card-text))'
                },
                header: {
                    text: 'rgb(var(--theme-header-text))'
                }
            }
        },
        spacing: {
            0: '0px',
            4: '4px',
            4: '4px',
            8: '8px',
            12: '12px',
            16: '16px',
            20: '20px',
            24: '24px',
            28: '28px',
            32: '32px',
            36: '36px',
            40: '40px',
            48: '48px',
            56: '56px',
            64: '64px',
            72: '72px',
            80: '80px',
            unit: 'var(--metrics-unit)',
            offset: 'var(--metrics-offset)',
            gutter: 'var(--metrics-gutter)',
            module: 'var(--metrics-module)',
            'header-height': 'var(--c-header-height)'
        },
        extend: {
            invert: {
                'header-logo': 'var(--theme-header-logo)',
                'footer-logo': 'var(--theme-footer-logo)'
            }
        }
    },
    mode: 'jit',
    content: [
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        '../../packages/ui/components/**/*.{js,ts,jsx,tsx}'
    ]
};
