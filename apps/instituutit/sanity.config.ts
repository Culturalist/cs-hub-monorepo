import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { vercelDeployTool } from "sanity-plugin-vercel-deploy";
import StudioLogo from "./studio/StudioLogo";
import { globalConfig, appConfig, appName, DocumentAny, capitalize, languageFilterConfig } from "@cs/globals";
import { initialValueTemplates, schemaTypes } from "@cs/data/schemas";
import { languageFilter } from "@sanity/language-filter";
import { colorInput } from "@sanity/color-input";
import { table } from "@sanity/table";
import { deskStructure } from "@cs/data";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

export default defineConfig({
    name: appName,
    title: appConfig.title,
    basePath: "/admin",
    projectId,
    dataset: "production",
    apiVersion: globalConfig.latestUpdate,

    plugins: [
        deskTool(deskStructure()),
        languageFilter(languageFilterConfig()),
        colorInput(),
        table(),
        vercelDeployTool()
    ],
    schema: {
        types: schemaTypes(),
        templates: initialValueTemplates
    },
    studio: {
        components: {
            logo: StudioLogo
        }
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
