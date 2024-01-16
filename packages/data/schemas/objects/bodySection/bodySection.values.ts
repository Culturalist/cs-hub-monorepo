import { DocumentApp } from "@cs/globals";

export type BodyBlockDefinition = Partial<Record<DocumentApp, string[]>>;

export const bodyBlockDefinitions: BodyBlockDefinition = {
    app: ["localePortableTextBody", "blockColumns", "blockMedia", "blockLinks", "blockCards"],
    page: ["localePortableTextBody", "blockColumns", "blockMedia", "blockLinks", "blockCards"],
    event: ["localePortableTextBody", "blockColumns", "blockMedia", "blockLinks", "blockCards", "blockSchedule"],
    project: ["localePortableTextBody", "blockColumns", "blockMedia", "blockLinks", "blockCards"],
    report: ["localePortableTextBody", "blockColumns", "blockMedia", "blockLinks", "blockTable", "blockChart"]
};
