import { MasterDetailIcon } from "@sanity/icons";
import desk from "./deskStructure.values";
import { appConfig, appName } from "@cs/globals";
import type { DeskToolOptions, StructureBuilder, StructureResolverContext } from "sanity/desk";
// import { defaultDocumentNode } from './defaultDocumentNode';

export default function deskStructure(): DeskToolOptions {
    return {
        name: "desk",
        title: "Desk",
        icon: MasterDetailIcon,
        // defaultDocumentNode: defaultDocumentNode,
        structure: (S: StructureBuilder, context: StructureResolverContext) =>
            S.list()
                .title("Content")
                .items([
                    S.listItem()
                        .title(desk.app.title)
                        .icon(desk.app.icon)
                        .child(S.document().schemaType("app").documentId(appName)),
                    ...appConfig.schemas.documents.map((docType) => {
                        return S.listItem()
                            .title(desk[docType].title)
                            .icon(desk[docType].icon)
                            .child(
                                S.documentTypeList(docType)
                                    .title(desk[docType].title)
                                    .initialValueTemplates([S.initialValueTemplateItem(`${docType}-with-initial`)])
                            );
                    })
                    // S.listItem()
                    //     .title("Themes")
                    //     .icon(MasterDetailIcon)
                    //     .child(S.documentTypeList("theme").title("Themes"))
                ])
    };
}
