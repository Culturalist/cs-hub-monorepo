import { defineField, defineType } from 'sanity';
import { SplitHorizontalIcon } from '@sanity/icons';
import { selectDefaultLocale } from '../../utils';
import { BlockWithId } from './body';
import { LocalePortableText } from './localePortableText';

export interface BlockSection extends BlockWithId {
    _type: 'blockSection';
    content?: LocalePortableText;
}

export default function blockSection(appName: string) {
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
                name: 'title',
                title: 'Index title',
                description: 'Will be used only for page index',
                type: 'blockId'
            }),
            defineField({
                name: 'blockId',
                title: 'Block ID',
                type: 'blockId'
            })
        ],
        preview: {
            select: {
                title: 'title',
                id: 'blockId.current'
            },
            prepare({ title, id }) {
                const localeTitle = selectDefaultLocale(title, appName);
                const subtitle = `${localeTitle ? 'Section ' : ''}${id || ''}`;
                return {
                    title: localeTitle || 'Section',
                    subtitle: ''
                };
            }
        },
        icon: SplitHorizontalIcon
    });
}
