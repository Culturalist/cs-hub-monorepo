import { Theme } from 'data/schemas';
import { Color } from 'globals';

export function colorToRGB(color: Color): string {
    return `${color.rgb.r} ${color.rgb.g} ${color.rgb.b}`;
}

export function getThemeVariables(theme?: Theme, className?: string): string {
    if (theme) {
        return `
            ${className ? `.${className}` : ':root'} {
                ${theme.surface ? `--theme-surface: ${colorToRGB(theme.surface)};` : ''}
                ${theme.text ? `--theme-text: ${colorToRGB(theme.text)};` : ''}
                ${theme.textLight ? `--theme-text-light: ${colorToRGB(theme.textLight)};` : ''}
                ${theme.cardSurface ? `--theme-card-surface: ${colorToRGB(theme.cardSurface)};` : ''}
                ${theme.cardText ? `--theme-card-text: ${colorToRGB(theme.cardText)};` : ''}
            }
        `;
    }
    return '';
}

export function getHeroVariables(theme?: Theme): string {
    if (theme) {
        return `
            ${getThemeVariables(theme, 'hero')}

            ${
                theme.text
                    ? `
                :root {
                    --theme-header-text: ${colorToRGB(theme.text)};
                    --theme-header-logo: ${theme.text.hsl.l};
                }
            `
                    : ''
            }
        `;
    }
    return '';
}

export function getPageVariables(theme?: Theme): string {
    if (theme) {
        return `
            ${getThemeVariables(theme)}

            ${
                theme.textLight
                    ? `
                :root {
                    --theme-footer-logo: ${theme.textLight.hsl.l};
                }
            `
                    : ''
            }
        `;
    }
    return '';
}
