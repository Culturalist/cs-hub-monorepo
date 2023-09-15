import { defineType, defineField, SanityDocument } from '@sanity/types';
import { SunIcon } from '@sanity/icons';
import { Color, DefaultSchemaProps } from 'globals';
import { themeColors } from './theme.values';
import { ThemeIcon } from './theme.icon';

interface SchemaProps extends DefaultSchemaProps {}

export interface Theme extends SanityDocument {
    _type: 'theme' | 'reference';
    _ref?: string;
    name?: string;
    surface: Color;
    text: Color;
    textLight: Color;
    cardSurface: Color;
    cardText: Color;
}

export default function theme({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'theme',
        title: 'Theme',
        type: 'document',
        options: {
            columns: 1
        },
        fields: [
            defineField({
                name: 'name',
                title: 'Theme name',
                type: 'string'
            }),
            defineField({
                name: 'surface',
                title: 'Surface',
                type: 'color',
                options: {
                    colorList: themeColors
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'text',
                title: 'Text',
                type: 'color',
                options: {
                    colorList: themeColors
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'textLight',
                title: 'Lighter Text',
                type: 'color',
                options: {
                    colorList: themeColors
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'cardSurface',
                title: 'Card Surface',
                type: 'color',
                options: {
                    colorList: themeColors
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'cardText',
                title: 'Card Text',
                type: 'color',
                options: {
                    colorList: themeColors
                },
                validation: Rule => Rule.required()
            })
        ],
        preview: {
            select: {
                name: 'name',
                surface: 'surface.hex',
                text: 'text.hex',
                textLight: 'textLight.hex',
                cardSurface: 'cardSurface.hex',
                cardText: 'cardText.hex'
            },
            prepare({ name, surface, text, textLight, cardSurface, cardText }) {
                return {
                    title: name || 'Theme',
                    subtitle: name ? 'Theme' : '',
                    media: surface ? (
                        <ThemeIcon
                            surface={surface}
                            text={text}
                            textLight={textLight}
                            cardSurface={cardSurface}
                            cardText={cardText}
                        />
                    ) : (
                        SunIcon
                    )
                };
            }
        },
        icon: SunIcon,
        __experimental_omnisearch_visibility: false
    });
}
