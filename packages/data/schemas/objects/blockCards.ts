import { defineField, defineType } from 'sanity';
import { ThLargeIcon } from '@sanity/icons';
import { filterByDocumentApp } from '../../utils';
import { CardsType, cardsTypeList } from '../values';
import { capitalize } from 'weresk';
import globalConfig from 'globals/globalConfig';
import { CardManual } from './cardManual';
import { Person, Post, Project, Event } from '../documents';
import { Label } from '../system';

export type CardSource = Project | Post | Person | Event;
export type Card = CardManual | CardSource;

export interface BlockCards {
    _type: 'blockCards';
    type: CardsType;
    manual?: CardManual[];
    projects?: (Project | Label)[];
    posts?: (Post | Label)[];
    people?: (Person | Label)[];
    events?: (Event | Label)[];
    groupByLabel?: boolean;
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
            defineField({
                name: 'groupByLabel',
                title: 'Group cards by labels',
                type: 'boolean',
                initialValue: false,
                hidden: ({ parent }) => !['people', 'projects', 'events', 'posts'].includes(parent?.type)
            })
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
