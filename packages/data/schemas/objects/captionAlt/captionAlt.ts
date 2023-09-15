import { DefaultSchemaProps } from 'globals';
import { defineType, defineField } from '@sanity/types';
import { LocaleString } from '../localeString';

interface SchemaProps extends DefaultSchemaProps {}

export interface CaptionAlt {
    _type: 'captionAlt';
    alt?: LocaleString;
    caption?: LocaleString;
}

export default function captionAlt(props: SchemaProps) {
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
