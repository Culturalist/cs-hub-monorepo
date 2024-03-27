import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { languageFilter } from "@sanity/language-filter";
import { colorInput } from "@sanity/color-input";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
import { table } from "@sanity/table";
import { globalConfig, appConfig, appName, DocumentAny, capitalize } from "@cs/globals";
import { languageFilterConfig } from "@cs/globals/lib/language-filter";
import { initialValueTemplates, schemaTypes } from "@cs/data/schemas";
import { deskStructure } from "@cs/data/studio";
import { StudioLogo } from "@cs/ui";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export default defineConfig({
    name: appName,
    title: appConfig.title,
    basePath: "/admin",
    projectId,
    dataset: "production",
    apiVersion: globalConfig.latestUpdate,
    icon: StudioLogo[appName],
    plugins: [
        structureTool(deskStructure(appName)),
        languageFilter(languageFilterConfig()),
        colorInput(),
        table(),
        vercelDeployTool()
    ],
    schema: {
        types: schemaTypes(),
        templates: initialValueTemplates
    },
    document: {
        actions: (prev, { schemaType }) => {
            if (!appConfig.schemas.create.includes(schemaType as DocumentAny)) {
                return prev.filter(
                    (prevAction) =>
                        prevAction.action !== "unpublish" &&
                        prevAction.action !== "delete" &&
                        prevAction.action !== "duplicate"
                );
            }
            return prev;
        },
        newDocumentOptions: () => {
            return appConfig.schemas.create.map((docType) => ({
                title: capitalize(docType),
                templateId: `${docType}-with-initial`,
                type: "initialValueTemplateItem"
            }));
        }
    }
});
