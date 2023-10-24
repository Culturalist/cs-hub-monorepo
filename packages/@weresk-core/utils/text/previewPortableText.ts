/* eslint @typescript-eslint/no-unnecessary-condition: 0 */
import type { Block } from "../../types";

export function previewPortableText(input: (Block | object)[] | undefined): string {
    return input?.length && "_type" in input[0] && input[0]._type === "block" ? input[0].children[0].text : "";
}
