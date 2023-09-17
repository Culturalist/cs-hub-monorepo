import { defineType, defineField } from '@sanity/types';
import { CalendarIcon } from '@sanity/icons';
import { LocaleString } from '../localeString';
import { LocalePortableText } from '../localePortableText';
import { selectDefaultLocale } from '../../../utils';
import { DefaultSchemaProps } from 'globals';

interface SchemaProps extends DefaultSchemaProps {}

export interface ElementSchedule {
    _type: 'elementSchedule';
    _key: string;
    time?: string;
    title?: LocaleString;
    subtitle?: LocaleString;
    description?: LocalePortableText;
}

export default function elementSchedule({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'elementSchedule',
        title: 'Event',
        type: 'object',
        fields: [
            defineField({
                name: 'time',
                title: 'Date / Time',
                type: 'string'
            }),
            defineField({
                name: 'title',
                title: 'Title',
                type: 'localeString'
            }),
            defineField({
                name: 'subtitle',
                title: 'Subtitle',
                type: 'localeString',
                options: {
                    collapsible: true,
                    collapsed: true
                }
            }),
            defineField({
                name: 'description',
                title: 'Description',
                type: 'localePortableTextField'
            })
        ],
        preview: {
            select: {
                time: 'time',
                title: 'title'
            },
            prepare({ time, title }) {
                const localeTitle = selectDefaultLocale(title);
                return {
                    title: localeTitle || 'Event',
                    subtitle: time
                };
            }
        },
        icon: CalendarIcon
    });
}
