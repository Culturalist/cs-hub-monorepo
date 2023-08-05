import { defineField, defineType } from 'sanity';
import { selectDefaultLocale } from '../../utils';
import { InlineElementIcon } from '@sanity/icons';
import { LocaleString } from './localeString';
import { LinkTyped } from './linkTyped';
import { themeColors } from '../values';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { Color } from 'globals';

export interface CardManual {
    _type: 'cardManual';
    title?: LocaleString;
    subtitle?: LocaleString;
    link?: LinkTyped;
    cover?: SanityImageObject;
    cardSurface?: Color;
    coverOnHover?: boolean;
}

export default function cardManual(appName: string) {
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
            }),
            defineField({
                name: 'coverOnHover',
                title: 'Show cover only on hover',
                type: 'boolean',
                initialValue: true,
                hidden: ({ parent }) => !parent?.cover,
                fieldset: 'style'
            })
        ],
        preview: {
            select: {
                title: 'title',
                cover: 'cover'
            },
            prepare({ title, cover }) {
                const localeTitle = selectDefaultLocale(title, appName);
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
