import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons';

export interface ElementDate {
    _type: 'elementDate';
    _key: string;
    date?: string;
    start?: string;
    end?: string;
}

export default function elementDate() {
    return defineType({
        name: 'elementDate',
        title: 'Date',
        type: 'object',
        options: {
            columns: 3
        },
        fields: [
            defineField({
                name: 'date',
                title: 'Date',
                type: 'date',
                initialValue: new Date().toISOString().split('T')[0]
            }),
            defineField({
                name: 'start',
                title: 'Start time',
                type: 'string',
                initialValue: '12:00',
                validation: Rule =>
                    Rule.regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).warning('Use valid time format (HH:MM)')
            }),
            defineField({
                name: 'end',
                title: 'End time',
                type: 'string',
                initialValue: '13:00',
                validation: Rule =>
                    Rule.regex(/^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).warning('Use valid time format (HH:MM)')
            })
        ],
        preview: {
            select: {
                date: 'date',
                start: 'start',
                end: 'end'
            },
            prepare({ date, start, end }) {
                return {
                    title: date || 'Date',
                    subtitle: `${start ? start : ''} – ${end ? end : ''}`
                };
            }
        },
        icon: CalendarIcon
    });
}
