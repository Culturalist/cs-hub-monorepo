export type Locale = "fi" | "ru" | "en";
export type Breakpoint = "xs" | "sm" | "md" | "lg";

export type DocumentApp = "app" | "page" | "person" | "post" | "project" | "event" | "note" | "organisation";
export type DocumentSystem = "label" | "palette";
export type DocumentAny = DocumentApp | DocumentSystem;

export interface AppConfig {
    title: string;
    schemas: {
        documents: DocumentApp[];
        links: DocumentApp[];
        navigation: DocumentApp[];
        create: DocumentAny[];
    };
    parentDocuments?: Partial<Record<DocumentApp, string>>;
    tokens?: Record<string, string>;
}

export interface GlobalConfig {
    localization: {
        languages: {
            id: Locale;
            title: string;
            abbr: string;
        }[];
        default: Locale;
        safeReplace?: boolean;
    };
    latestUpdate: string;
    organization: string;
    creator: string;
    tokens?: Record<string, string>;
    debug?: boolean;
}
