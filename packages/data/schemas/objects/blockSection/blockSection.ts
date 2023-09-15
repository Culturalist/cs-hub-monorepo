import { defineField, defineType, Slug } from '@sanity/types';
import { SplitHorizontalIcon } from '@sanity/icons';
import { selectDefaultLocale } from '../../../utils';
import { DefaultSchemaProps } from 'globals';
import { capitalize } from 'globals/utils';
import globalConfig from 'globals/globalConfig';
import { LocaleString } from '../localeString';
import { DocumentApp } from '../../documents';
import { BodySectionBlock } from '../bodySection';

interface SchemaProps extends DefaultSchemaProps {
    parent: DocumentApp;
}

export interface BlockSection {
    _type: `blockSection${Capitalize<DocumentApp>}`;
    typeClass: 'blockSection';
    _key: string;
    title?: LocaleString;
    content?: BodySectionBlock[];
    indexTitle?: LocaleString;
    blockId?: Slug;
}

export default function blockSection({ parent, appName = 'hub' }: SchemaProps) {
    const lang = globalConfig.localization.default;
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
                name: 'typeClass',
                title: 'Class',
                type: 'string',
                initialValue: 'blockSection',
                readOnly: true,
                hidden: true
            }),
            defineField({
                name: 'title',
                title: 'Section title',
                description: 'Will be visible on the page',
                type: 'localeString',
                options: {
                    columns: 2
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
                description: 'Manual override for title used in page index, if not set – section title will be used',
                type: 'localeString',
                options: {
                    columns: 2
                },
                fieldset: 'index'
            }),
            defineField({
                name: 'blockId',
                title: 'Block ID',
                type: 'blockId',
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
                const localeTitle = selectDefaultLocale(indexTitle) || selectDefaultLocale(title);
                const subtitle = `${localeTitle ? 'Section ' : ''}${id ? `#${id}` : ''}`;
                return {
                    title: localeTitle || 'Section',
                    subtitle: subtitle
                };
            }
        },
        icon: SplitHorizontalIcon
    });
}
