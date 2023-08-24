import { defineType, defineField } from 'sanity';
import { LocaleString } from './localeString';

export interface CaptionAlt {
    _type: 'captionAlt';
    alt?: LocaleString;
    caption?: LocaleString;
}

export default function CaptionAlt() {
    return defineType({
        name: 'captionAlt',
        title: 'Caption & Alternative text',
        type: 'object',
        fields: [
            defineField({
                name: 'alt',
                title: 'Alternative text',
                type: 'localeString'
            }),
            defineField({
                name: 'caption',
                title: 'Caption',
                type: 'localeString'
            })
        ]
    });
}
