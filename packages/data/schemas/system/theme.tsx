import React from 'react';
import { defineType, defineField } from 'sanity';
import { SunIcon } from '@sanity/icons';
import { themeColors } from '../values';

export default function theme() {
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
                }
            }),
            defineField({
                name: 'text',
                title: 'Text',
                type: 'color',
                options: {
                    colorList: themeColors
                }
            }),
            defineField({
                name: 'textLight',
                title: 'Lighter Text',
                type: 'color',
                options: {
                    colorList: themeColors
                }
            }),
            defineField({
                name: 'cardSurface',
                title: 'Card Surface',
                type: 'color',
                options: {
                    colorList: themeColors
                }
            }),
            defineField({
                name: 'cardText',
                title: 'Card Text',
                type: 'color',
                options: {
                    colorList: themeColors
                }
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
        icon: SunIcon
    });
}

const ThemeIcon = ({
    surface,
    text,
    textLight,
    cardSurface,
    cardText
}: {
    surface: string;
    text: string;
    textLight: string;
    cardSurface: string;
    cardText: string;
}) => (
    <div
        style={{
            width: '100%',
            maxHeight: '40px',
            padding: '4px',
            paddingTop: '1px',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: surface
        }}
    >
        <div
            style={{
                color: text,
                fontWeight: 500,
                fontSize: '16px'
            }}
        >
            A
            <span
                style={{
                    color: textLight
                }}
            >
                a
            </span>
        </div>
        <div
            style={{
                width: '12px',
                height: '12px',
                color: cardText,
                backgroundColor: cardSurface
            }}
        ></div>
    </div>
);
