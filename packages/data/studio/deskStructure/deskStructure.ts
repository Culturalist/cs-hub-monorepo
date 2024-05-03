import type {
    StructureToolOptions,
    StructureBuilder,
    StructureResolverContext,
    ListItemBuilder,
    ListItem,
    Divider
} from "sanity/structure";
import { MasterDetailIcon, TerminalIcon } from "@sanity/icons";
import deskValues from "./deskStructure.values";
import { DocumentApp, desk } from "@cs/globals";
// import type {
//     DeskToolOptions,
//     Divider,
//     ListItem,
//     ListItemBuilder,
//     StructureBuilder,
//     StructureResolverContext
// } from "sanity/desk";
// import { defaultDocumentNode } from './defaultDocumentNode';

export default function deskStructure(appName: string): StructureToolOptions {
    const appDesk = desk[appName];
    return {
        name: "desk",
        title: "Desk",
        icon: MasterDetailIcon,
        // defaultDocumentNode: defaultDocumentNode,
        structure: (S: StructureBuilder, context: StructureResolverContext) => {
            const appItems: (ListItemBuilder | ListItem | Divider)[] = [];

            Object.entries(appDesk).forEach(([_docType, parents]) => {
                const docType = _docType as DocumentApp;
                // If just the single type without parent page
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
                }
                // If just the single type with parent page
                else if (parents.length === 1) {
                    appItems.push(
                        S.listItem()
                            .title(parents[0].title)
                            .icon(deskValues[docType].icon)
                            .child(
                                S.documentTypeList(docType)
                                    .title(parents[0].title)
                                    .filter("_type == $docType && parent._ref == $parentId")
                                    .params({ docType, parentId: parents[0].parentId })
                                    .initialValueTemplates([
                                        S.initialValueTemplateItem(`${docType}-with-parent`, {
                                            parentId: parents[0].parentId
                                        })
                                    ])
                            )
                    );
                }
                // If type with multiple parent pages
                else {
                    const itemsFolder: (ListItemBuilder | ListItem | Divider)[] = [];
                    parents.forEach(({ parentId, title }) => {
                        itemsFolder.push(
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
                    appItems.push(
                        S.listItem()
                            .title(deskValues[docType].title)
                            .icon(deskValues[docType].icon)
                            .child(
                                S.list()
                                    .title(deskValues[docType].title)
                                    .items([
                                        ...itemsFolder,
                                        S.listItem()
                                            .title(`All ${deskValues[docType].title}`)
                                            .icon(deskValues[docType].icon)
                                            .child(
                                                S.documentTypeList(docType)
                                                    .title(`All ${deskValues[docType].title}`)
                                                    .initialValueTemplates([
                                                        S.initialValueTemplateItem(`${docType}-with-initial`)
                                                    ])
                                            )
                                    ])
                            )
                    );
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

                    // S.listItem()
                    //     .title("News")
                    //     .icon(TerminalIcon)
                    //     .child(S.document().schemaType("page").documentId("uutiset"))

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
