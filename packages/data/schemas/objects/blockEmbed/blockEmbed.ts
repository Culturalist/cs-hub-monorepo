import { defineType, defineField } from '@sanity/types';
import { CodeBlockIcon } from '@sanity/icons';
import { LocaleString } from '../localeString';
import { selectDefaultLocale } from '../../../utils';
import { capitalize } from 'globals/utils';
import { EmbedSource, embedSourceList } from './blockEmbed.values';

export interface BlockEmbed {
    _type: 'mediEmbed';
    _key: string;
    source: EmbedSource;
    url?: string;
    caption?: LocaleString;
}

export default function blockEmbed() {
    return defineType({
        name: 'blockEmbed',
        title: 'Embedded',
        type: 'object',
        fields: [
            defineField({
                name: 'source',
                title: 'Source',
                type: 'string',
                initialValue: 'vimeo',
                options: {
                    list: embedSourceList,
                    layout: 'radio',
                    direction: 'horizontal'
                },
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'url',
                title: 'URL',
                type: 'url',
                description: 'Vimeo or Youtube link',
                validation: Rule =>
                    Rule.custom(link => {
                        const regex = /^(http|https):\/\/(vimeo.com|youtube.com|youtu.be)\S+/g;
                        if (!link || regex.test(link)) {
                            return true;
                        } else {
                            return 'Not a valid link';
                        }
                    })
            }),
            defineField({
                name: 'caption',
                title: 'Caption',
                type: 'localeString',
                options: {
                    collapsible: true,
                    collapsed: true
                }
            })
        ],
        preview: {
            select: {
                source: 'source',
                caption: 'caption'
            },
            prepare({ source, caption }) {
                const localeCaption = selectDefaultLocale(caption);
                const title = `${capitalize(source)} video`;
                return {
                    title: localeCaption || title,
                    subtitle: localeCaption ? title : ''
                };
            }
        },
        icon: CodeBlockIcon
    });
}
