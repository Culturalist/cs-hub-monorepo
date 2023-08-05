import { ReferenceFilterSearchOptions } from 'sanity';

export default function filterByDocumentApp(document: any): ReferenceFilterSearchOptions {
    if (document.app?._ref)
        return {
            filter: 'app._ref == $appRef || !defined(app)',
            params: { appRef: document.app._ref }
        };
    return {
        filter: ''
    };
}
