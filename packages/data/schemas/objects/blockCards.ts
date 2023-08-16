import { defineField, defineType } from 'sanity';
import { ThLargeIcon } from '@sanity/icons';
import { selectDefaultLocale } from '../../utils';
import { CardsType, cardsTypeList } from '../values';
import { BlockWithId } from './body';

export interface BlockCards extends BlockWithId {
    _type: 'blockCards';
    type: CardsType;
}

export default function blockCards(appName: string) {
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
                    list: cardsTypeList,
                    layout: 'radio',
                    direction: 'horizontal'
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'title',
                title: 'Index title',
                description: 'Will be used only for page index',
                type: 'localeString'
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
                const subtitle = `${localeTitle ? 'Cards ' : ''}${id || ''}`;
                return {
                    title: localeTitle || 'Cards',
                    subtitle: ''
                };
            }
        },
        icon: ThLargeIcon
    });
}
