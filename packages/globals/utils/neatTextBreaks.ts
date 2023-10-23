import { Children } from "react";

export function neatTextBreaks(input?: string, length?: 1 | 2 | 3): string {
    let output = input || "";
    if (length) {
        if (length === 1) output = output.replace(/(\s\S|\s\d+)\s/gi, "$1\xa0");
        else if (length === 2)
            output = output.replace(/(\s\S{1,2}|\s\d+)\s/gi, "$1\xa0");
    } else {
        output = output.replace(/(\s\S{1,3}|\s\d+)\s/gi, "$1\xa0"); //Words with less than 3 letters and numbers
    }
    output = output.replace("-", "\u2011"); //Non breakable hyphems
    return output;
}

export function neatChildrenBreaks(
    children?: React.ReactNode,
    length?: 1 | 2 | 3
): React.ReactNode {
    const output = Children.map(children, (child) => {
        if (typeof child === "string") return neatTextBreaks(child, length);
        return child;
    });
    return output;
}
