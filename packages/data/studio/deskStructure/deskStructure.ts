import { MasterDetailIcon, TerminalIcon } from "@sanity/icons";
import deskValues from "./deskStructure.values";
import { DocumentApp, appDesk, appName } from "@cs/globals";
import type {
    DeskToolOptions,
    Divider,
    ListItem,
    ListItemBuilder,
    StructureBuilder,
    StructureResolverContext
} from "sanity/desk";
// import { defaultDocumentNode } from './defaultDocumentNode';

export default function deskStructure(): DeskToolOptions {
    return {
        name: "desk",
        title: "Desk",
        icon: MasterDetailIcon,
        // defaultDocumentNode: defaultDocumentNode,
        structure: (S: StructureBuilder, context: StructureResolverContext) => {
            const appItems: (ListItemBuilder | ListItem | Divider)[] = [];

            Object.entries(appDesk).forEach(([_docType, parents]) => {
                const docType = _docType as DocumentApp;
                if (!parents.length) {
                    appItems.push(
                        S.listItem()
                            .title(deskValues[docType].title)
                            .icon(deskValues[docType].icon)
                            .child(
                                S.documentTypeList(docType)
                                    .title(deskValues[docType].title)
                                    .initialValueTemplates([S.initialValueTemplateItem(`${docType}-with-initial`)])
                            )
                    );
                } else {
                    parents.forEach(({ parentId, title }) => {
                        appItems.push(
                            S.listItem()
                                .title(title)
                                .icon(deskValues[docType].icon)
                                .child(
                                    S.documentTypeList(docType)
                                        .title(title)
                                        .filter("_type == $docType && parent._ref == $parentId")
                                        .params({ docType, parentId })
                                        .initialValueTemplates([
                                            S.initialValueTemplateItem(`${docType}-with-parent`, {
                                                parentId
                                            })
                                        ])
                                )
                        );
                    });
                }
            });

            return S.list()
                .title("Content")
                .items([
                    S.listItem()
                        .title(deskValues.app.title)
                        .icon(deskValues.app.icon)
                        .child(S.document().schemaType("app").documentId(appName)),
                    ...appItems,

                    // View all documents for dev only
                    ...(context.currentUser?.email === "merlinni@gmail.com"
                        ? [
                              S.listItem()
                                  .title("All documents")
                                  .icon(TerminalIcon)
                                  .child(
                                      S.list()
                                          .title("All documents")
                                          .items([...S.documentTypeListItems()])
                                  )
                          ]
                        : [])

                    // ...appConfig.schemas.documents.map((docType) => {
                    //     return S.listItem()
                    //         .title(deskValues[docType].title)
                    //         .icon(deskValues[docType].icon)
                    //         .child(
                    //             S.documentTypeList(docType)
                    //                 .title(deskValues[docType].title)
                    //                 .initialValueTemplates([S.initialValueTemplateItem(`${docType}-with-initial`)])
                    //         );
                    // })

                    // S.listItem()
                    //     .title("Themes")
                    //     .icon(MasterDetailIcon)
                    //     .child(S.documentTypeList("theme").title("Themes"))
                ]);
        }
    };
}
