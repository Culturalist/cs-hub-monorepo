import { defineType, defineField } from '@sanity/types';
import { CalendarIcon } from '@sanity/icons';
import { selectDefaultLocale } from '../../../utils';
import { ElementSchedule } from '../elementSchedule/elementSchedule';
import { DefaultSchemaProps } from 'globals';

interface SchemaProps extends DefaultSchemaProps {}

export interface BlockSchedule {
    _type: 'blockSchedule';
    schedule?: ElementSchedule[];
    // expandDescription?: boolean;
}

export default function blockSchedule({ appName = 'hub' }: SchemaProps) {
    return defineType({
        name: 'blockSchedule',
        title: 'Schedule',
        type: 'object',
        fields: [
            defineField({
                name: 'schedule',
                title: 'Schedule',
                type: 'array',
                of: [
                    {
                        type: 'elementSchedule'
                    }
                ]
            })
            // defineField({
            //     name: 'expandDescription',
            //     title: 'Expand description by default',
            //     type: 'boolean',
            //     initialValue: false
            // })
        ],
        preview: {
            select: {
                eventTitle: 'schedule.0.title',
                eventTime: 'schedule.0.time'
            },
            prepare({ eventTitle, eventTime }) {
                const title = `${eventTime ? `${eventTime} – ` : ''}${selectDefaultLocale(eventTitle) || ''}`;
                return {
                    title: title || 'Schedule',
                    subtitle: title ? 'Schedule' : ''
                };
            }
        },
        icon: CalendarIcon
    });
}
