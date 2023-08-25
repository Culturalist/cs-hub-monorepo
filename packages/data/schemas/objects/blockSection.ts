import { defineField, defineType, Slug } from 'sanity';
import { SplitHorizontalIcon } from '@sanity/icons';
import { selectDefaultLocale } from '../../utils';
import { LocalePortableText } from './localePortableText';
import globalConfig from 'globals/globalConfig';
import { LocaleString } from './localeString';
import { DocumentApp } from '../values';
import { capitalize } from 'weresk';

export interface BlockSection {
    _type: `blockSection${Capitalize<DocumentApp>}`;
    _key: string;
    title?: LocaleString;
    content?: LocalePortableText;
    indexTitle?: LocaleString;
    blockId?: Slug;
}

export default function blockSection(parent: DocumentApp, appName: string) {
    const lang = globalConfig.apps[appName].localization.default;
    return defineType({
        name: `blockSection${capitalize(parent)}`,
        title: 'Section',
        type: 'object',
        fieldsets: [
            {
                name: 'index',
                title: 'Index',
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }
        ],
        fields: [
            defineField({
                name: 'title',
                title: 'Section title',
                description: 'Will be visible on the page',
                type: 'localeString',
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }),
            defineField({
                name: 'content',
                title: 'Content',
                type: `bodySection${capitalize(parent)}`
            }),
            defineField({
                name: 'indexTitle',
                title: 'Index title',
                description: 'Manual override for title used in page index',
                type: 'localeString',
                fieldset: 'index'
            }),
            defineField({
                name: 'blockId',
                title: 'Block ID',
                type: 'blockId',
                options: {
                    source: `indexTitle.${lang}`
                },
                fieldset: 'index'
            })
        ],
        preview: {
            select: {
                title: 'title',
                indexTitle: 'indexTitle',
                id: 'blockId.current'
            },
            prepare({ title, indexTitle, id }) {
                const localeTitle = selectDefaultLocale(indexTitle, appName) || selectDefaultLocale(title, appName);
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
