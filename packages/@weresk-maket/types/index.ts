export type GridZoomMode = "off" | "down" | "up" | "both";

export interface GridBreakpoint {
    name: string;
    width?: number;
    columns: number;
    module: number;
    gutter: number;
    offset: number;
    zoom?: GridZoomMode;
}

export interface GridConfig {
    unit: number;
    columns: number;
    module: number;
    gutter: number;
    offset: number;
    breakpoints?: GridBreakpoint[];
}

export interface DefaultGridConfig extends GridConfig {
    color: string;
    modules: number[];
    maxSpacing: number;
}
