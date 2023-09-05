import { defineField, defineType } from 'sanity';
import { ThLargeIcon } from '@sanity/icons';
import { filterByDocumentApp } from '../../utils';
import { CardsType, cardsTypeList, CardPart, personCardParts } from '../values';
import { capitalize } from 'globals/utils';
import globalConfig from 'globals/globalConfig';
import { CardManual } from './cardManual';
import { Person, Post, Project, Event, Organisation } from '../documents';
import { Label } from '../system';

export type CardSource = Project | Post | Person | Event | Organisation;
export type Card = CardManual | CardSource;

export interface BlockCards {
    _type: 'blockCards';
    type: CardsType;
    manual?: CardManual[];
    projects?: (Project | Label)[];
    posts?: (Post | Label)[];
    people?: (Person | Label)[];
    events?: (Event | Label)[];
    organisations?: (Organisation | Label)[];
    monochromePhoto?: boolean;
    includePerson?: CardPart[];
    coverOnHover?: boolean;
    displayDates?: boolean;
    showLabels?: boolean;
}

export default function blockCards(appName: string = 'hub') {
    return defineType({
        name: 'blockCards',
        title: 'Cards',
        type: 'object',
        fields: [
            defineField({
                name: 'type',
                title: 'Type',
                type: 'string',
                initialValue: 'manual',
                options: {
                    list: cardsTypeList
                        .filter(({ docType }) =>
                            ['manual', ...globalConfig.apps[appName].schemas.documents].includes(docType)
                        )
                        .map(cardType => ({
                            title: cardType.title,
                            value: cardType.value
                        })),
                    layout: 'radio',
                    direction: 'horizontal'
                },
                validation: Rule => Rule.required()
            }),
            ...cardsTypeList
                .filter(({ docType }) => ['manual', ...globalConfig.apps[appName].schemas.documents].includes(docType))
                .map(({ value, title, docType }) => {
                    if (value == 'manual') {
                        return defineField({
                            name: 'manual',
                            title: 'Manual',
                            type: 'array',
                            of: [
                                {
                                    type: 'cardManual'
                                }
                            ],
                            hidden: ({ parent }) => parent?.type !== 'manual'
                        });
                    }

                    return defineField({
                        name: value,
                        title: title,
                        type: 'array',
                        description: `Select ${value} individually or by label`,
                        of: [
                            {
                                name: value,
                                title: capitalize(docType),
                                type: 'reference',
                                to: [{ type: docType }],
                                options: {
                                    disableNew: true,
                                    filter: ({ document }: any) => filterByDocumentApp(document)
                                }
                            },
                            {
                                name: 'label',
                                title: 'Label',
                                type: 'reference',
                                to: [{ type: 'label' }],
                                options: {
                                    disableNew: true
                                }
                            }
                        ],
                        hidden: ({ parent }) => parent?.type !== value
                    });
                }),
            // Options
            defineField({
                name: 'includePerson',
                title: 'Include',
                type: 'array',
                description: 'Select information to include in card',
                of: [{ type: 'string' }],
                initialValue: ['subtitle'],
                options: {
                    list: personCardParts,
                    layout: 'grid'
                },
                hidden: ({ parent }) => parent?.type !== 'people'
            }),
            defineField({
                name: 'monochromePhoto',
                title: 'Make photos monochrome',
                type: 'boolean',
                initialValue: false,
                hidden: ({ parent }) => parent?.type !== 'people'
            }),
            defineField({
                name: 'coverOnHover',
                title: 'Show cards cover only on hover',
                type: 'boolean',
                initialValue: false,
                hidden: ({ parent }) => parent?.type !== 'manual'
            }),
            defineField({
                name: 'displayDates',
                title: 'Display each date as separate card',
                type: 'boolean',
                initialValue: false,
                hidden: ({ parent }) => parent?.type !== 'events'
            }),
            defineField({
                name: 'showLabels',
                title: 'Show labels',
                type: 'boolean',
                initialValue: false,
                hidden: ({ parent }) => parent?.type !== 'projects'
            })
            // defineField({
            //     name: 'groupByLabel',
            //     title: 'Group cards by labels',
            //     type: 'boolean',
            //     initialValue: false,
            //     hidden: ({ parent }) => !['people', 'projects', 'events', 'posts'].includes(parent?.type)
            // })
        ],
        preview: {
            select: {
                cardType: 'type'
            },
            prepare({ cardType }) {
                return {
                    title: capitalize(cardType) || 'Cards',
                    subtitle: cardType ? 'Cards' : ''
                };
            }
        },
        icon: ThLargeIcon
    });
}
