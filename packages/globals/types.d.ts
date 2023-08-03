import { Locale } from './globalConfig';

export interface AppConfig {
    title: string;
    domain: string;
    localization: {
        languages: Locale[];
        default: Locale;
    };
    schemas: {
        documents: string[];
    };
}

export interface GlobalConfig {
    localization: {
        languages: {
            id: Locale;
            title: string;
        }[];
        default: Locale;
    };
    apps: Record<string, AppConfig>;
    creator: string;
}

export type { Locale } from './globalConfig';
