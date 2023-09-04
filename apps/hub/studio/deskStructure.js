import { MasterDetailIcon, TerminalIcon } from '@sanity/icons';
import { desk } from 'data';
import globalConfig from 'globals/globalConfig';
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
                                ...globalConfig.apps['culturaweek'].schemas.documents.map(docType => {
                                    return S.listItem()
                                        .title(desk[docType].title)
                                        .icon(desk[docType].icon)
                                        .child(
                                            S.documentTypeList(docType)
                                                .title(desk[docType].title)
                                                .filter('_type == $type && app._ref == $appName')
                                                .params({ type: docType, appName: 'culturaweek' })
                                                .initialValueTemplates([
                                                    S.initialValueTemplateItem(`${docType}-by-app`, {
                                                        appName: 'culturaweek'
                                                    })
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
                                ...globalConfig.apps['juhlarahasto'].schemas.documents.map(docType => {
                                    return S.listItem()
                                        .title(desk[docType].title)
                                        .icon(desk[docType].icon)
                                        .child(
                                            S.documentTypeList(docType)
                                                .title(desk[docType].title)
                                                .filter('_type == $type && app._ref == $appName')
                                                .params({ type: docType, appName: 'juhlarahasto' })
                                                .initialValueTemplates([
                                                    S.initialValueTemplateItem(`${docType}-by-app`, {
                                                        appName: 'juhlarahasto'
                                                    })
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
