import { MasterDetailIcon } from '@sanity/icons';
import { desk } from 'data/values';
import globalConfig from 'globals/globalConfig';
import app from '../app.json';
// import { defaultDocumentNode } from './defaultDocumentNode';

const { appName } = app;

export default {
    name: 'desk',
    title: 'Desk',
    icon: MasterDetailIcon,
    // defaultDocumentNode: defaultDocumentNode,
    structure: (S, context) =>
        S.list()
            .title('Content')
            .items([
                S.listItem()
                    .title(desk.app.title)
                    .icon(desk.app.icon)
                    .child(S.document().schemaType('app').documentId(appName)),
                ...globalConfig.apps[appName].schemas.documents.map(docType => {
                    return S.listItem()
                        .title(desk[docType].title)
                        .icon(desk[docType].icon)
                        .child(
                            S.documentTypeList(docType)
                                .title(desk[docType].title)
                                .filter('_type == $type && app._ref == $appName')
                                .params({ type: docType, appName: appName })
                                .initialValueTemplates([
                                    S.initialValueTemplateItem(`${docType}-by-app`, { appName: appName })
                                ])
                        );
                })
            ])
};
