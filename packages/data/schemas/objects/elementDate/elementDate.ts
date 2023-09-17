import { defineType, defineField } from '@sanity/types';
import { CalendarIcon } from '@sanity/icons';
import { LocaleString } from '../localeString';
import { selectDefaultLocale } from '../../../utils';
import { DefaultSchemaProps } from 'globals';

interface SchemaProps extends DefaultSchemaProps {}

export interface ElementDate {
    _type: 'elementDate';
    _key: string;
    date: string;
    start?: string;
    end?: string;
    location?: LocaleString;
    mapUrl?: string;
}

export default function elementDate({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'elementDate',
        title: 'Date',
        type: 'object',
        fieldsets: [
            {
                name: 'date',
                title: ' ',
                options: {
                    columns: 3
                }
            }
        ],
        fields: [
            defineField({
                name: 'date',
                title: 'Date',
                type: 'date',
                initialValue: new Date().toISOString().split('T')[0],
                fieldset: 'date',
                validation: Rule => Rule.required()
            }),
            defineField({
                name: 'start',
                title: 'Start time',
                type: 'string',
                initialValue: '12:00',
                validation: Rule =>
                    Rule.regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).warning('Use valid time format (HH:MM)'),
                fieldset: 'date'
            }),
            defineField({
                name: 'end',
                title: 'End time',
                type: 'string',
                initialValue: '13:00',
                validation: Rule =>
                    Rule.regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).warning('Use valid time format (HH:MM)'),
                fieldset: 'date'
            }),
            defineField({
                name: 'location',
                title: 'Location',
                type: 'localeString'
            }),
            {
                name: 'mapUrl',
                title: 'Map URL',
                type: 'url',
                description: `URL starts with "http://" or "https://"`,
                validation: Rule =>
                    Rule.uri({
                        scheme: ['http', 'https']
                    }),
                hidden: ({ parent }) => !parent?.location
            }
        ],
        preview: {
            select: {
                date: 'date',
                start: 'start',
                end: 'end',
                location: 'location'
            },
            prepare({ date, start, end, location }) {
                const localeDate = new Date(date).toLocaleString('fi-FI', { month: 'numeric', day: 'numeric' });
                const localeLocation = selectDefaultLocale(location);
                return {
                    title: localeDate || 'Date',
                    subtitle: `${start ? start : ''} – ${end ? end : ''}${localeLocation ? ', ' + localeLocation : ''}`
                };
            }
        },
        icon: CalendarIcon
    });
}
