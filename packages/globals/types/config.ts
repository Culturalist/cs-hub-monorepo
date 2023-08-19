import { DocumentAny, DocumentApp } from 'data';

export type Locale = 'fi' | 'ru' | 'en';

export interface AppConfig {
    title: string;
    domain: string;
    localization: {
        languages: Locale[];
        default: Locale;
    };
    schemas: {
        documents: DocumentApp[];
        links: DocumentApp[];
        navigation: DocumentApp[];
        create: DocumentAny[];
    };
    parentDocuments?: Partial<Record<DocumentApp, string>>;
}

export interface GlobalConfig {
    localization: {
        languages: {
            id: Locale;
            title: string;
            abbr: string;
        }[];
        default: Locale;
    };
    apps: Record<string, AppConfig>;
    routes: Record<DocumentApp, string>;
    metrics: {
        unit: number;
        offset: number;
        module: number;
        gutter: number;
    };
    latestUpdate: string;
    organization: string;
    creator: string;
    debug?: boolean;
}
