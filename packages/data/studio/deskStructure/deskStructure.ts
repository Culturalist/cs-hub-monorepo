import { MasterDetailIcon } from '@sanity/icons';
import desk from './deskStructure.values';
import { appConfig, appName } from 'globals';
// import { defaultDocumentNode } from './defaultDocumentNode';

export default function deskStructure(): any {
    return {
        name: 'desk',
        title: 'Desk',
        icon: MasterDetailIcon,
        // defaultDocumentNode: defaultDocumentNode,
        structure: (S: any, context: any) =>
            S.list()
                .title('Content')
                .items([
                    S.listItem()
                        .title(desk.app.title)
                        .icon(desk.app.icon)
                        .child(S.document().schemaType('app').documentId(appName)),
                    ...appConfig.schemas.documents.map(docType => {
                        return S.listItem()
                            .title(desk[docType].title)
                            .icon(desk[docType].icon)
                            .child(
                                S.documentTypeList(docType)
                                    .title(desk[docType].title)
                                    .initialValueTemplates([S.initialValueTemplateItem(`${docType}-with-initial`)])
                            );
                    })
                ])
    };
}
