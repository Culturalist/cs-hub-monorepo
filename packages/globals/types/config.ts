import { DocumentAny, DocumentApp } from 'data';

export type Locale = 'fi' | 'ru' | 'en';
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg';

export interface AppConfig {
    title: string;
    domain: string;
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
    apps: Record<string, AppConfig>;
    routes: Record<DocumentApp, string>;
    latestUpdate: string;
    organization: string;
    creator: string;
    tokens?: Record<string, string>;
    debug?: boolean;
}
