import type { PluginUtils } from "tailwindcss/types/config";

export type ResolvableTo<T> = T | ((utils: PluginUtils) => T);

export interface GridConfig {
    screens?: Record<string, string | number>;
    grid?: {
        unit: Record<string, string | number>;
        columns: Record<string, string | number>;
        module: Record<string, string | number>;
        gutter: Record<string, string | number>;
        offset: Record<string, string | number>;
        scale?:
            | boolean
            | {
                  min?: string | number;
                  max?: string | number;
              };
        color?: string | Record<string, string>;
        ruler?: {
            steps?: number;
            modules?: number[];
        };
    };
    pd?: Record<string, string | number>;
}

export interface FontImport {
    style: string;
    weight: number | string;
    src: string | string[];
}

export interface FontMetrics {
    capHeight: number | string;
    xHeight: number | string;
    bottom: number | string;
    inset: number | string;
}

export interface FontFamily {
    familyName: string;
    extends?: "sans" | "serif" | "mono";
    included?: "sans" | "serif" | "mono";
    imports: FontImport[];
    metrics?: {
        hhea: FontMetrics;
        typo: FontMetrics;
    };
}

export type TypoStyle = Record<string, string | number | Record<string, string | number>>;

export interface TypographyConfig {
    typography?: {
        fonts?: Record<string, FontFamily>;
        styles?: Record<string, TypoStyle>;
        outline?: Record<string, string | number>;
        constants?: Record<string, string | number>;
    };
}

export interface PaletteConfig {
    swatches?: ResolvableTo<Record<string, string>>;
    palette?: ResolvableTo<Record<string, string>>;
}

export type MaketConfig = GridConfig & TypographyConfig & PaletteConfig;
