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
    externalLinks?: Record<string, string>;
    googleTag?: string;
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
    breakpoints: Record<Breakpoint, number>;
    pd: Record<Breakpoint, number>;
    metrics: {
        unit: number;
        offset: number;
    } & Record<
        Breakpoint,
        {
            module: number;
            gutter: number;
        }
    >;
    latestUpdate: string;
    organization: string;
    creator: string;
    debug?: boolean;
}
