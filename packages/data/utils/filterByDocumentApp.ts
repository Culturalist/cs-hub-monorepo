import type { ReferenceFilterSearchOptions } from "@sanity/types";

export function filterByDocumentApp(document: any): ReferenceFilterSearchOptions {
    const { _id, _type } = document;
    // eslint-disable-next-line
    const _ref = document.app?._ref;
    if (typeof _ref === "string") {
        const appRef = _ref.replace("drafts.", "");
        return {
            filter: "app._ref == $appRef",
            params: { appRef }
        };
    } else if (_type === "app" && typeof _id === "string") {
        const appRef = _id.replace("drafts.", "");
        return {
            filter: "app._ref == $appRef",
            params: { appRef }
        };
    }
    return {
        filter: ""
    };
}
