import { Breakpoint } from "@cs/globals";
import { numeric } from "@weresk/core";
import { gridConfig } from "../maket";

export type BoxDimentions = [number, number];
export type AdaptiveDimentions = Record<Breakpoint, BoxDimentions>;
export type AdaptiveValue = Record<Breakpoint, number>;

export const breakpoints: Breakpoint[] = ["xs", "sm", "md", "lg"];

export function moduleToPx(m: number, br: Breakpoint, pd = 1): number {
    return pd * (m * numeric(gridConfig.grid?.module[br]) + (m - 1) * numeric(gridConfig.grid?.gutter[br]));
}

export function _box(d: BoxDimentions, br: Breakpoint, pd?: number): BoxDimentions {
    return [moduleToPx(d[0], br, pd), moduleToPx(d[1], br, pd)];
}

export function boxFromWidthRatio(width: number, ratio: number): BoxDimentions {
    return [width, Math.floor(width / ratio)];
}

export function boxPx(dimensions: AdaptiveDimentions, breakpoint: Breakpoint): BoxDimentions {
    return dimensions[breakpoint].map((d) => Math.floor(d * numeric(gridConfig.pd?.[breakpoint]))) as BoxDimentions;
}

export function imageWidthToFill(
    imageAspectRatio: number | undefined,
    containerAspectRatio: number,
    breakpoint: Breakpoint,
    pd = 1
): number {
    if (imageAspectRatio)
        return Math.floor((numeric(gridConfig.screens?.[breakpoint]) / containerAspectRatio) * imageAspectRatio * pd);

    return numeric(gridConfig.screens?.[breakpoint]) * pd;
}

export function imageBoxToFill(
    imageAspectRatio: number | undefined,
    containerAspectRatio: number,
    breakpoint: Breakpoint,
    pd = 1
): BoxDimentions {
    const width = imageWidthToFill(imageAspectRatio, containerAspectRatio, breakpoint, pd);
    return [width, Math.floor(width / containerAspectRatio)];
}
