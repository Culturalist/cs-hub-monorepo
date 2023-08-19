import globalConfig from 'globals/globalConfig';

export type BoxDimentions = [number, number];
export type AdaptiveDimentions = Record<'sm' | 'md' | 'lg', BoxDimentions>;

export function moduleToPx(m: number, dpi: number = 1): number {
    return dpi * (m * globalConfig.metrics.module + (m - 1) * globalConfig.metrics.gutter);
}

export function box(d: BoxDimentions, dpi?: number): BoxDimentions {
    return [moduleToPx(d[0], dpi), moduleToPx(d[1], dpi)];
}
