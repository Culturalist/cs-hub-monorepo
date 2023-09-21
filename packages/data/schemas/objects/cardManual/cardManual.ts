import { defineType, defineField } from '@sanity/types';
import { InlineElementIcon } from '@sanity/icons';
import { selectDefaultLocale } from '../../../utils';
import { LocaleString } from '../localeString';
import { LinkTyped } from '../linkTyped';
import { themeColors } from '../../system';
import { Color, ImageObject } from 'globals';

export interface CardManual {
    _type: 'cardManual';
    _key: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    link?: LinkTyped;
    cover?: ImageObject;
    cardSurface?: Color;
}

export default function cardManual() {
    return defineType({
        name: 'cardManual',
        title: 'Card',
        type: 'object',
        fieldsets: [
            {
                name: 'style',
                title: 'Style',
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }
        ],
        fields: [
            defineField({
                name: 'title',
                title: 'Title',
                type: 'localeString'
            }),
            defineField({
                name: 'subtitle',
                title: 'Subtitle',
                type: 'localeString',
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }),
            defineField({
                name: 'link',
                title: 'Link',
                type: 'linkTyped'
            }),
            defineField({
                name: 'cover',
                title: 'Cover',
                type: 'image'
            }),
            defineField({
                name: 'cardSurface',
                title: 'Custom color',
                type: 'color',
                options: {
                    colorList: themeColors
                },
                fieldset: 'style'
            })
        ],
        preview: {
            select: {
                title: 'title',
                cover: 'cover'
            },
            prepare({ title, cover }) {
                const localeTitle = selectDefaultLocale(title);
                const url = '';
                return {
                    title: localeTitle || 'Card',
                    subtitle: localeTitle ? url : '',
                    media: cover
                };
            }
        },
        icon: InlineElementIcon
    });
}
