export interface SanityDocument {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

export interface Reference {
    _type: 'reference';
    _ref: string;
}

export interface Slug {
    _type: 'slug';
    current: string;
}

export interface SanityImage {
    _type: string;
    asset: Record<string, any>;
}

export interface SanityImageDimensions {
    _type?: string;
    aspectRatio: number;
    width: number;
    height: number;
}

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
