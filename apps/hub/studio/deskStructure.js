import { MasterDetailIcon, TerminalIcon } from '@sanity/icons';
import { desk } from 'data/studio/deskStructure';
import { appsConfig, globalConfig } from 'globals';
// import { defaultDocumentNode } from './defaultDocumentNode';

export default {
    name: 'desk',
    title: 'Desk',
    icon: MasterDetailIcon,
    // defaultDocumentNode: defaultDocumentNode,
    structure: (S, context) =>
        S.list()
            .title('Websites')
            .items([
                //CulturaWeek
                S.listItem()
                    .title('CulturaWeek')
                    .icon(MasterDetailIcon)
                    .child(
                        S.list()
                            .title('CulturaWeek')
                            .items([
                                S.listItem()
                                    .title(desk.app.title)
                                    .icon(desk.app.icon)
                                    .child(S.document().schemaType('app').documentId('culturaweek')),
                                ...appsConfig['culturaweek'].schemas.documents.map(docType => {
                                    return S.listItem()
                                        .title(desk[docType].title)
                                        .icon(desk[docType].icon)
                                        .child(
                                            S.documentTypeList(docType)
                                                .title(desk[docType].title)
                                                .initialValueTemplates([
                                                    S.initialValueTemplateItem(`${docType}-with-initial`)
                                                ])
                                        );
                                })
                            ])
                    ),
                //Juhlarahasto
                S.listItem()
                    .title('Juhlarahasto')
                    .icon(MasterDetailIcon)
                    .child(
                        S.list()
                            .title('Juhlarahasto')
                            .items([
                                S.listItem()
                                    .title(desk.app.title)
                                    .icon(desk.app.icon)
                                    .child(S.document().schemaType('app').documentId('juhlarahasto')),
                                ...appsConfig['juhlarahasto'].schemas.documents.map(docType => {
                                    return S.listItem()
                                        .title(desk[docType].title)
                                        .icon(desk[docType].icon)
                                        .child(
                                            S.documentTypeList(docType)
                                                .title(desk[docType].title)
                                                .initialValueTemplates([
                                                    S.initialValueTemplateItem(`${docType}-with-initial`)
                                                ])
                                        );
                                })
                            ])
                    ),
                S.divider(),
                S.listItem()
                    .title('All documents')
                    .icon(TerminalIcon)
                    .child(
                        S.list()
                            .title('All documents')
                            .items([...S.documentTypeListItems()])
                    )
            ])
};
