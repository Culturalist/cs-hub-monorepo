import gridConfig from "./grid.config";
import paletteConfig from "./palette.config";
import typographyConfig from "./typography.config";
import type { MaketConfig } from "@weresk/maket";

export { default as gridConfig } from "./grid.config";
export { default as paletteConfig } from "./palette.config";
export { default as typographyConfig } from "./typography.config";

export const maketConfig: MaketConfig = {
    ...gridConfig,
    ...paletteConfig,
    ...typographyConfig
};
