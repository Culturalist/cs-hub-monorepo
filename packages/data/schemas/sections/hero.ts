import { defineField, defineType } from 'sanity';
import { actionTypeList } from '../values';

export default function hero() {
    return defineType({
        name: 'hero',
        title: 'Hero',
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
                name: 'covers',
                title: 'Covers',
                type: 'mediaArray'
            }),
            defineField({
                name: 'lead',
                title: 'Lead',
                type: 'localeString'
            }),
            defineField({
                name: 'action',
                title: 'Action type',
                type: 'string',
                initialValue: 'cards',
                options: {
                    list: actionTypeList,
                    layout: 'radio',
                    direction: 'horizontal'
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'cards',
                title: 'Cards',
                type: 'array',
                of: [{ type: 'cardManual' }],
                validation: Rule => Rule.max(3),
                hidden: ({ parent }) => parent?.action !== 'cards'
            }),
            defineField({
                name: 'links',
                title: 'Links',
                type: 'array',
                of: [{ type: 'linkCaptioned' }],
                validation: Rule => Rule.max(3),
                hidden: ({ parent }) => !(parent?.action == 'links' || parent?.action == 'buttons')
            }),
            defineField({
                name: 'theme',
                title: 'Hero theme',
                type: 'reference',
                description: 'If not set – default website theme will be used',
                to: [{ type: 'theme' }],
                fieldset: 'style'
            })
        ]
    });
}
