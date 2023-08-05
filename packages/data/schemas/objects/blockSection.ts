import { defineField, defineType } from 'sanity';
import { SplitHorizontalIcon } from '@sanity/icons';

export default function blockSection() {
    return defineType({
        name: 'blockSection',
        title: 'Section',
        type: 'object',
        fields: [
            defineField({
                name: 'content',
                title: 'Content',
                type: 'localePortableTextSection'
            }),
            defineField({
                name: 'blockId',
                title: 'Block ID',
                type: 'blockId'
            })
        ],
        preview: {
            select: {
                body: 'body',
                id: 'blockId.current'
            },
            prepare({ body, id }) {
                return {
                    title: 'Section',
                    subtitle: ''
                };
            }
        },
        icon: SplitHorizontalIcon
    });
}
