import { longestWord, numeric } from "@weresk/core";
import { typographyConfig } from "../maket";

export function hasLongWords(input: string): boolean {
    if (typographyConfig.typography?.constants?.hyphenWordLengthLimit) {
        return longestWord(input).length > numeric(typographyConfig.typography.constants.hyphenWordLengthLimit);
    }
    return false;
}
