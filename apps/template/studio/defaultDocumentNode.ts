import { DefaultDocumentNodeResolver } from 'sanity/desk';
import Iframe from 'sanity-plugin-iframe-pane';
import { previewDocuments } from 'data/lists';
import { PageDocument } from 'data/types';
import { getDocRoute } from 'data/utils';

const productionUrl = process.env.NEXT_PUBLIC_PRODUCTION_URL || 'localhost:3000';
const previewToken = process.env.NEXT_PUBLIC_PREVIEW_TOKEN || '';

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
    if (previewDocuments.includes(schemaType)) {
        return S.document().views([
            S.view.form(),
            S.view
                .component(Iframe)
                .options({
                    url: (doc: PageDocument) =>
                        `${productionUrl}/api/draft?token=${previewToken}&url=${getDocRoute(doc, schemaType)}`,
                    reload: {
                        button: true, // default `undefined`
                        revision: 5000 // boolean | number. default `undefined`. If a number is provided, add a delay (in ms) before the automatic reload on document revision
                    },
                    attributes: {
                        allow: 'fullscreen' // string, optional
                    }
                })
                .title('Preview')
        ]);
    }
    return S.document().views([S.view.form()]);
};
