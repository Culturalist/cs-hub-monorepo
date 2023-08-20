import { Breakpoint } from 'globals';
import globalConfig from 'globals/globalConfig';

export type BoxDimentions = [number, number];
export type AdaptiveDimentions = Record<Breakpoint, BoxDimentions>;

export function moduleToPx(m: number, br: Breakpoint, dpi: number = 1): number {
    return dpi * (m * globalConfig.metrics[br].module + (m - 1) * globalConfig.metrics[br].gutter);
}

export function box(d: BoxDimentions, br: Breakpoint, dpi?: number): BoxDimentions {
    return [moduleToPx(d[0], br, dpi), moduleToPx(d[1], br, dpi)];
}
