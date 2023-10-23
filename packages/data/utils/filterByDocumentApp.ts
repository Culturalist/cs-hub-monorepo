import { ReferenceFilterSearchOptions } from 'sanity';

export function filterByDocumentApp(document: any): ReferenceFilterSearchOptions {
    if (document.app?._ref) {
        const appRef = document.app._ref.replace('drafts.', '');
        return {
            filter: 'app._ref == $appRef',
            params: { appRef: appRef }
        };
    } else if (document._type == 'app') {
        const appRef = document._id.replace('drafts.', '');
        return {
            filter: 'app._ref == $appRef',
            params: { appRef: appRef }
        };
    }
    return {
        filter: ''
    };
}
