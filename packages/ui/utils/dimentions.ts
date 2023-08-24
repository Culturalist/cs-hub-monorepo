import { Breakpoint } from 'globals';
import globalConfig from 'globals/globalConfig';

export type BoxDimentions = [number, number];
export type AdaptiveDimentions = Record<Breakpoint, BoxDimentions>;
export type AdaptiveValue = Record<Breakpoint, number>;

export const Breakpoints: Breakpoint[] = ['xs', 'sm', 'md', 'lg'];

export function moduleToPx(m: number, br: Breakpoint, dpi: number = 1): number {
    return dpi * (m * globalConfig.metrics[br].module + (m - 1) * globalConfig.metrics[br].gutter);
}

export function box(d: BoxDimentions, br: Breakpoint, dpi?: number): BoxDimentions {
    return [moduleToPx(d[0], br, dpi), moduleToPx(d[1], br, dpi)];
}

export function imageWidthToFill(
    imageAspectRatio: number | undefined,
    containerAspectRatio: number,
    breakpoint: Breakpoint,
    dpi: number = 1
): number {
    if (imageAspectRatio)
        return Math.floor((globalConfig.breakpoints[breakpoint] / containerAspectRatio) * imageAspectRatio * dpi);

    return globalConfig.breakpoints[breakpoint] * dpi;
}

export function imageBoxToFill(
    imageAspectRatio: number | undefined,
    containerAspectRatio: number,
    breakpoint: Breakpoint,
    dpi: number = 1
): BoxDimentions {
    const width = imageWidthToFill(imageAspectRatio, containerAspectRatio, breakpoint, dpi);
    return [width, Math.floor(width / containerAspectRatio)];
}
