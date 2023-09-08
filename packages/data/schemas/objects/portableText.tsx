import React from 'react';
import { defineField, defineType } from 'sanity';
import { TransferIcon, EqualIcon } from '@sanity/icons';
import { Block } from 'globals';
import { capitalize } from 'globals/utils';
import { BlockParent, linkTypeList, portableTextDefinitions } from '../values';
import globalConfig from 'globals/globalConfig';
import { filterByDocumentApp } from '../../utils';

export type PortableTextBlock = Block;

const LeadStyle = (props: any) => <span style={{ fontSize: '1.5em' }}>{props.children}</span>;
const SmallStyle = (props: any) => <span style={{ fontSize: '0.75em' }}>{props.children}</span>;

export default function portableText(parent: BlockParent, appName: string) {
    return defineType({
        name: `portableText${capitalize(parent)}`,
        title: 'Portable Text',
        type: 'array',
        of: [
            {
                type: 'block',
                styles: [
                    { title: 'Normal', value: 'normal' },
                    {
                        title: 'Lead',
                        value: 'lead',
                        component: LeadStyle
                    },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    {
                        title: 'Small',
                        value: 'small',
                        component: SmallStyle
                    }
                ].filter(style => portableTextDefinitions.styles[parent].includes(style.value)),
                lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' }
                ].filter(style => portableTextDefinitions.lists[parent].includes(style.value)),
                marks: {
                    decorators: [
                        // { title: 'Emphasis', value: 'em' },
                        { title: 'Strong', value: 'strong' },
                        { title: 'Underline', value: 'underline' },
                        { title: 'Strikethrough', value: 'strike-through' }
                    ],
                    annotations: [
                        {
                            name: 'link',
                            type: 'object',
                            title: 'Link',
                            fields: [
                                defineField({
                                    name: 'type',
                                    title: 'Type',
                                    type: 'string',
                                    initialValue: 'external',
                                    options: {
                                        list: linkTypeList,
                                        layout: 'radio',
                                        direction: 'horizontal'
                                    }
                                }),
                                defineField({
                                    name: 'reference',
                                    title: 'Reference',
                                    type: 'reference',
                                    description: 'Reference to a page to link to',
                                    to: globalConfig.apps[appName].schemas.links.map(docType => ({ type: docType })),
                                    options: {
                                        disableNew: true,
                                        filter: ({ document }: any) => filterByDocumentApp(document)
                                    },
                                    hidden: ({ parent }) => parent?.type !== 'reference'
                                }),
                                defineField({
                                    name: 'href',
                                    title: 'URL',
                                    type: 'url',
                                    description: `URL starts with "http://" or "https://" and email with "mailto"`,
                                    validation: Rule =>
                                        Rule.uri({
                                            scheme: ['http', 'https', 'mailto']
                                        }),
                                    hidden: ({ parent }) => !(parent?.type == 'external' || !parent?.type)
                                }),
                                defineField({
                                    name: 'internal',
                                    title: 'URL',
                                    type: 'url',
                                    description: `Relative URL starts with "/" and can contain anchors and queries`,
                                    validation: Rule =>
                                        Rule.uri({
                                            allowRelative: true
                                        }),
                                    hidden: ({ parent }) => parent?.type !== 'internal'
                                }),
                                defineField({
                                    name: 'anchor',
                                    title: 'Anchor',
                                    type: 'string',
                                    description: 'ID of the block on the same page',
                                    hidden: ({ parent }) => parent?.type !== 'anchor'
                                }),
                                defineField({
                                    name: 'file',
                                    title: 'File',
                                    type: 'file',
                                    hidden: ({ parent }) => parent?.type !== 'file'
                                })
                            ]
                        }
                    ].filter(field => portableTextDefinitions.annotations[parent].includes(field.name))
                }
            },
            ...[
                {
                    type: 'mediaImage'
                }
            ].filter(field => portableTextDefinitions.blocks[parent].includes(field.type))
        ]
    });
}
