import { Breakpoint } from 'globals';
import globalConfig from 'globals/globalConfig';

export type BoxDimentions = [number, number];
export type AdaptiveDimentions = Record<Breakpoint, BoxDimentions>;
export type AdaptiveValue = Record<Breakpoint, number>;

export const breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg'];

export function moduleToPx(m: number, br: Breakpoint, pd: number = 1): number {
    return pd * (m * globalConfig.metrics[br].module + (m - 1) * globalConfig.metrics[br].gutter);
}

export function box(d: BoxDimentions, br: Breakpoint, pd?: number): BoxDimentions {
    return [moduleToPx(d[0], br, pd), moduleToPx(d[1], br, pd)];
}

export function boxFromWidthRatio(width: number, ratio: number): BoxDimentions {
    return [width, Math.floor(width / ratio)];
}

export function boxPx(dimensions: AdaptiveDimentions, breakpoint: Breakpoint): BoxDimentions {
    return dimensions[breakpoint].map(d => Math.floor(d * globalConfig.pd[breakpoint])) as BoxDimentions;
}

export function imageWidthToFill(
    imageAspectRatio: number | undefined,
    containerAspectRatio: number,
    breakpoint: Breakpoint,
    pd: number = 1
): number {
    if (imageAspectRatio)
        return Math.floor((globalConfig.breakpoints[breakpoint] / containerAspectRatio) * imageAspectRatio * pd);

    return globalConfig.breakpoints[breakpoint] * pd;
}

export function imageBoxToFill(
    imageAspectRatio: number | undefined,
    containerAspectRatio: number,
    breakpoint: Breakpoint,
    pd: number = 1
): BoxDimentions {
    const width = imageWidthToFill(imageAspectRatio, containerAspectRatio, breakpoint, pd);
    return [width, Math.floor(width / containerAspectRatio)];
}
