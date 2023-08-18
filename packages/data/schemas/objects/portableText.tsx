import React from 'react';
import { defineType } from 'sanity';
import { TransferIcon, EqualIcon } from '@sanity/icons';
import { Block } from 'globals';
import { capitalize } from 'weresk/utils';
import { BlockParent, portableTextDefinitions } from '../values';

export type PortableTextBlock = Block;

const LeadStyle = (props: any) => <span style={{ fontSize: '1.5em' }}>{props.children}</span>;
const SmallStyle = (props: any) => <span style={{ fontSize: '0.75em' }}>{props.children}</span>;

export default function portableText(parent: BlockParent) {
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
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
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
                                {
                                    name: 'link',
                                    type: 'linkTyped'
                                }
                            ]
                        }
                    ].filter(field => portableTextDefinitions.annotations[parent].includes(field.name))
                }
            },
            ...[
                {
                    type: 'string'
                }
            ].filter(field => portableTextDefinitions.blocks[parent].includes(field.type))
        ]
    });
}
