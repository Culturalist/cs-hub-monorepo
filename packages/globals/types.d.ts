import { DocumentApp } from 'data';

export type Locale = 'su' | 'ru' | 'en';

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
    latestUpdate: string;
    creator: string;
}

//Sanity

export interface Span {
    _type: 'span';
    _key: string;
    marks: string[];
    text: string;
}

export interface Block {
    _type: 'block';
    _key: string;
    children: Span[];
    markDefs: any[];
    style: string;
}

export interface ListItem {
    value: string;
    title: string;
}

export interface Link {
    _type: 'link';
    _key: string;
    href: string;
}

export interface VideoObject {
    asset?: SanityAsset;
    url?: string;
}

export interface Color {
    _type: 'color';
    alpha: number;
    hex: string;
    hsl: {
        _type: 'hslColor';
        h: number;
        s: number;
        l: number;
        a: number;
    };
    hsv: {
        _type: 'hsvColor';
        h: number;
        s: number;
        v: number;
        a: number;
    };
    rgb: {
        _type: 'rgbColor';
        r: number;
        g: number;
        b: number;
        a: number;
    };
}
