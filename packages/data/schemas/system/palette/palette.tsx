import { palette as paletteClass } from "@weresk/maket";
import { brandSwatches } from "./palette.values";

export default function palette() {
    return paletteClass({ swatches: brandSwatches });
}
