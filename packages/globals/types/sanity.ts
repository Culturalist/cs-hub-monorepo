import { SanityAsset } from '@sanity/image-url/lib/types/types';
import { LocaleString } from 'data/schemas/objects/localeString';

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

export interface VideoObject {
    asset?: SanityAsset;
    url?: string;
}